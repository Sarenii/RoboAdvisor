const Portfolio = require('../models/portfolioModel');

exports.generateReport = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ user: req.user._id });
    let totalValue = 0;
    portfolios.forEach((pf) => {
      pf.assets.forEach((asset) => {
        totalValue += asset.shares * asset.price;
      });
    });

    const summary = `Portfolio Report for ${req.user.email}
Total Portfolios: ${portfolios.length}
Combined Value: $${totalValue.toFixed(2)}
Generated on: ${new Date().toLocaleString()}
`;

    res.setHeader('Content-Type', 'text/plain');
    res.send(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
