// controllers/portfolioController.js

const Portfolio = require('../models/portfolioModel');
const Notification = require('../models/notificationModel');
const User = require('../models/userModel');
const { getRealTimeQuote } = require('../services/marketDataService');

/**
 * Advanced allocation function:
 * This function chooses target symbols based on the user's financial goals and risk tolerance.
 * It then splits the provided investmentAmount evenly among these symbols, fetching real-time prices.
 * 
 * @param {string} userGoals - The user's financial goals (e.g., "retire", "house")
 * @param {string} riskTolerance - User's risk tolerance: "Low", "Moderate", or "High"
 * @param {number} investmentAmount - The total amount to invest in this portfolio
 * @returns {Promise<Array>} - Array of assets objects: [{ symbol, shares, price }, ...]
 */
async function advancedAllocateAssets(userGoals, riskTolerance, investmentAmount) {
  let targetSymbols = [];
  const goalsLower = userGoals.toLowerCase();

  if (goalsLower.includes('retire')) {
    // More conservative allocation if goals include "retire"
    if (riskTolerance === 'High') {
      targetSymbols = ['QQQ', 'BND', 'SPY'];
    } else {
      targetSymbols = ['BND', 'SPY'];
    }
  } else if (goalsLower.includes('house')) {
    // Moderate allocation if goals include "house"
    targetSymbols = ['SPY', 'BND'];
  } else {
    // Fallback purely based on risk tolerance
    if (riskTolerance === 'Low') {
      targetSymbols = ['BND', 'SPY'];
    } else if (riskTolerance === 'High') {
      targetSymbols = ['QQQ', 'ARKK'];
    } else {
      targetSymbols = ['SPY', 'QQQ'];
    }
  }

  const totalCapital = Number(investmentAmount);
  if (!totalCapital || totalCapital <= 0) {
    throw new Error("Investment amount must be greater than zero for automated allocation.");
  }
  
  const finalAssets = [];
  // Evenly allocate the capital among target symbols
  const eachAllocation = totalCapital / targetSymbols.length;

  for (const symbol of targetSymbols) {
    const quote = await getRealTimeQuote(symbol);
    const price = quote.price || 100; // Fallback price
    const shares = Math.floor(eachAllocation / price);
    finalAssets.push({
      symbol,
      shares,
      price,
    });
  }
  return finalAssets;
}

/**
 * Calculate the total value of a portfolio by summing asset (shares * price).
 * @param {Array} assets - Array of asset objects.
 * @returns {number} - Total portfolio value.
 */
function calculatePortfolioValue(assets) {
  return assets.reduce((total, asset) => total + asset.shares * asset.price, 0);
}

exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Create a new portfolio.
 * 
 * For automated allocation, this function uses the user's financial goals and risk tolerance,
 * along with the provided investmentAmount, to fetch real-time prices and allocate assets accordingly.
 * If allocationType is 'manual', it expects a user-provided assets array (and fetches real prices for each).
 * Also, the user's profile must have financial goals set.
 */
exports.createPortfolio = async (req, res) => {
  try {
    const { name, investmentAmount, riskTolerance, assets, allocationType } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // 1. Ensure the user has set financial goals in their profile
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.goals || user.goals.trim() === '') {
      return res.status(400).json({ message: 'Please set financial goals in your profile before creating a portfolio.' });
    }

    let finalAssets = [];
    if (allocationType === 'automated') {
      // For automated allocation, ensure investmentAmount is valid and use advanced allocation
      if (!investmentAmount || Number(investmentAmount) <= 0) {
        return res.status(400).json({ message: 'Please provide a valid investment amount for automated allocation.' });
      }
      finalAssets = await advancedAllocateAssets(user.goals, riskTolerance || user.riskTolerance, investmentAmount);
    } else {
      // Manual allocation: require assets array and fetch real-time prices for each asset
      if (!Array.isArray(assets) || assets.length === 0) {
        return res.status(400).json({ message: 'Please provide assets for manual allocation.' });
      }
      finalAssets = [];
      for (let i = 0; i < assets.length; i++) {
        const symbol = assets[i].symbol;
        const quote = await getRealTimeQuote(symbol);
        finalAssets.push({
          symbol,
          shares: Number(assets[i].shares),
          price: quote.price,
        });
      }
    }

    // 2. Calculate the total value of the new portfolio
    const totalValue = calculatePortfolioValue(finalAssets);

    // 3. Create the portfolio in the database
    const newPortfolio = await Portfolio.create({
      name,
      user: req.user._id,
      riskTolerance: riskTolerance || user.riskTolerance,
      assets: finalAssets,
      value: totalValue,
      investmentAmount: Number(investmentAmount) || 0,
      allocationType,
    });

    // 4. Create a notification for the user
    await Notification.create({
      user: req.user._id,
      message: `Portfolio "${name}" created successfully with value $${totalValue.toFixed(2)}.`,
    });

    res.status(201).json(newPortfolio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name, riskTolerance, assets, value } = req.body;
    if (name !== undefined) portfolio.name = name;
    if (riskTolerance !== undefined) portfolio.riskTolerance = riskTolerance;

    if (assets !== undefined) {
      for (let i = 0; i < assets.length; i++) {
        const quote = await getRealTimeQuote(assets[i].symbol);
        assets[i].price = quote.price;
      }
      portfolio.assets = assets;
      portfolio.value = calculatePortfolioValue(assets);
    }

    if (value !== undefined) {
      portfolio.value = value;
    }

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
