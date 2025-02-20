const User = require('../models/userModel');
const Portfolio = require('../models/portfolioModel');

exports.getAnalytics = async (req, res) => {
  try {
    const userCount = await User.countDocuments({});
    const portfolioCount = await Portfolio.countDocuments({});
    // any additional stats (active users, average portfolio value, etc.)
    res.json({
      userCount,
      portfolioCount,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
