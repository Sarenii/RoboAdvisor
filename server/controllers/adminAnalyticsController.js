// controllers/adminAnalyticsController.js
const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');
// If you want to track visits, you'd store them in a separate model or a logging system

exports.getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const portfolioCount = await Portfolio.countDocuments({});
    // Add any other metrics you'd like
    // e.g., active user count, average portfolio size, etc.

    res.json({
      userCount,
      portfolioCount,
      // more stats...
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
