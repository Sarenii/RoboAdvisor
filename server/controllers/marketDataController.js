// controllers/marketDataController.js

const {
    getRealTimeQuote,
    getHistoricalData,
  } = require('../services/marketDataService.js');
  
  /**
   * GET /api/market-data/quote/:symbol
   * Retrieve the real-time quote for a given stock symbol.
   */
  exports.getQuote = async (req, res) => {
    try {
      const symbol = req.params.symbol;
      if (!symbol) {
        return res.status(400).json({ message: 'Symbol is required' });
      }
      const quote = await getRealTimeQuote(symbol);
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  /**
   * GET /api/market-data/history/:symbol
   * Retrieve historical data (daily) for a given stock symbol.
   */
  exports.getHistory = async (req, res) => {
    try {
      const symbol = req.params.symbol;
      if (!symbol) {
        return res.status(400).json({ message: 'Symbol is required' });
      }
      const history = await getHistoricalData(symbol);
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  