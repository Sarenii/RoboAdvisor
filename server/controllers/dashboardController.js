// controllers/dashboardController.js
const Portfolio = require('../models/portfolioModel');

exports.getDashboardData = async (req, res) => {
  try {
    // 1. Fetch all portfolios for this user
    const portfolios = await Portfolio.find({ user: req.user._id });

    // 2. Calculate total portfolio value by summing asset values
    let totalValue = 0;
    portfolios.forEach((pf) => {
      pf.assets.forEach((asset) => {
        totalValue += asset.shares * asset.price;
      });
    });

    // 3. (Optional) Calculate monthly return, risk level, etc.
    //    For demo, we’ll provide placeholders
    const monthlyReturn = 0.032; // +3.2%
    const riskLevel = portfolios[0]?.riskTolerance || 'Moderate';

    // 4. (Optional) Grab recent activity from your DB or generate placeholders
    const recentActivities = [
      'Portfolio Rebalanced on 02/15/2025',
      'Added $500 to Tech Growth Portfolio',
      'Received quarterly dividends from BlueChip Fund',
    ];

    // 5. Return them as JSON
    return res.json({
      totalValue,
      monthlyReturn,
      riskLevel,
      recentActivities,
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err.message);
    return res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
