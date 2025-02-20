const { getRealTimeQuote, getHistoricalData } = require('../services/marketDataService');

exports.getQuote = async (req, res) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ message: 'Symbol is required' });
    }
    const quote = await getRealTimeQuote(symbol);
    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ message: 'Symbol is required' });
    }
    const data = await getHistoricalData(symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
