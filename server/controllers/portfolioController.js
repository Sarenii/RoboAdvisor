// controllers/portfolioController.js

const Portfolio = require('../models/portfolioModel');
const Notification = require('../models/notificationModel');

/**
 * Helper function: autoAllocateAssets
 * Returns a simple preset allocation based on the user's risk tolerance.
 */
function autoAllocateAssets(riskTolerance) {
  const sampleAllocations = {
    Low: [
      { symbol: 'BND', shares: 10, price: 75 },  // Bond ETF
      { symbol: 'SPY', shares: 5, price: 400 }, // S&P 500 ETF
    ],
    Moderate: [
      { symbol: 'SPY', shares: 5, price: 400 },
      { symbol: 'QQQ', shares: 5, price: 300 }, // Nasdaq ETF
      { symbol: 'TLT', shares: 3, price: 100 }, // 20+ Yr Treasury Bond
    ],
    High: [
      { symbol: 'QQQ', shares: 10, price: 300 },
      { symbol: 'ARKK', shares: 5, price: 40 },  // A high-growth ETF
    ],
  };

  // Default to 'Moderate' if no matching key is found
  return sampleAllocations[riskTolerance] || sampleAllocations['Moderate'];
}

/**
 * Recalculate the total value of a portfolio by summing all asset prices * shares.
 */
function calculatePortfolioValue(assets) {
  let total = 0;
  assets.forEach((asset) => {
    total += asset.shares * asset.price;
  });
  return total;
}

/**
 * GET /api/portfolios
 * Fetch all portfolios owned by the current authenticated user.
 */
exports.getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id });
    res.json(portfolios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/portfolios/:id
 * Fetch a single portfolio by its ID.
 */
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    // Ensure only the owner can view
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * POST /api/portfolios
 * Create a new portfolio.
 * 
 * Request body can contain:
 *   name: Name of the portfolio (required)
 *   riskTolerance: 'Low' | 'Moderate' | 'High'
 *   assets: (Manual) array of { symbol, shares, price }
 *   allocationType: 'manual' or 'automated'
 */
exports.createPortfolio = async (req, res) => {
  try {
    const { name, riskTolerance, assets, allocationType } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    let finalAssets = [];
    if (allocationType === 'automated') {
      // Automatic allocation based on riskTolerance
      finalAssets = autoAllocateAssets(riskTolerance || 'Moderate');
    } else {
      // Manual allocation
      finalAssets = Array.isArray(assets) ? assets : [];
    }

    // Calculate total value
    const totalValue = calculatePortfolioValue(finalAssets);

    // Create the portfolio
    const newPortfolio = await Portfolio.create({
      name,
      user: req.user._id,
      riskTolerance: riskTolerance || 'Moderate',
      assets: finalAssets,
      value: totalValue,
    });

    // Create a notification to inform user
    await Notification.create({
      user: req.user._id,
      message: `Portfolio "${name}" created successfully.`,
    });

    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * PUT /api/portfolios/:id
 * Update an existing portfolio (name, riskTolerance, assets, etc.).
 */
exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    // Ensure only the owner can update
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { name, riskTolerance, assets, value } = req.body;

    if (name !== undefined) portfolio.name = name;
    if (riskTolerance !== undefined) portfolio.riskTolerance = riskTolerance;
    if (assets !== undefined) {
      portfolio.assets = assets;
      // Recalculate total value if assets changed
      portfolio.value = calculatePortfolioValue(assets);
    }
    if (value !== undefined) {
      // If you explicitly want to allow manual override
      portfolio.value = value;
    }

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * DELETE /api/portfolios/:id
 * Delete a portfolio by its ID.
 */
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    // Ensure only the owner can delete
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
