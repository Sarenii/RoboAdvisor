// controllers/portfolioController.js

const Portfolio = require('../models/portfolioModel');

exports.getAllPortfolios = async (req, res) => {
  try {
    // Fetch only portfolios belonging to the current authenticated user.
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
    // Check ownership
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const { name, riskTolerance, assets } = req.body;
    // Minimal validation: Ensure name is provided.
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Create the portfolio. If an assets array is provided, use it; otherwise default to an empty array.
    const newPortfolio = await Portfolio.create({
      name,
      user: req.user._id,
      riskTolerance: riskTolerance || 'Moderate',
      assets: Array.isArray(assets) ? assets : [],
      value: 0, // Optionally, you could compute the total value based on assets.
    });

    res.status(201).json(newPortfolio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }
    // Check if the authenticated user is the owner.
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Update portfolio fields if provided.
    const { name, riskTolerance, assets, value } = req.body;
    if (name !== undefined) portfolio.name = name;
    if (riskTolerance !== undefined) portfolio.riskTolerance = riskTolerance;
    if (assets !== undefined) portfolio.assets = assets;
    if (value !== undefined) portfolio.value = value;

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
    // Check ownership
    if (portfolio.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await portfolio.remove();
    res.json({ message: 'Portfolio deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
