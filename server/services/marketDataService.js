// services/marketDataService.js

const axios = require('axios');

const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

// In-memory cache to reduce API calls (simple approach)
const cache = {};

/**
 * Fetch real-time quote for a given symbol
 * @param {string} symbol - e.g. "AAPL", "TSLA"
 * @returns {Promise<Object>} - Real-time quote data
 */
async function getRealTimeQuote(symbol) {
  const cacheKey = `realtime-${symbol.toUpperCase()}`;

  // Check cache (valid for 2 minutes in this example)
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 2 * 60 * 1000)) {
    return cache[cacheKey].data;
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data['Global Quote'] || {};

    const result = {
      symbol: data['01. symbol'] || symbol,
      price: parseFloat(data['05. price'] || '0'),
      change: parseFloat(data['09. change'] || '0'),
      changePercent: parseFloat((data['10. change percent'] || '0').replace('%', '')),
      timestamp: new Date().toISOString(),
    };

    // Save to cache
    cache[cacheKey] = {
      data: result,
      timestamp: Date.now(),
    };
    return result;
  } catch (error) {
    console.error('Error fetching real-time quote:', error.message);
    throw new Error('Failed to fetch real-time quote');
  }
}

/**
 * Fetch historical daily data for a given symbol
 * @param {string} symbol - e.g. "AAPL", "TSLA"
 * @returns {Promise<Array>} - Array of historical data points
 */
async function getHistoricalData(symbol) {
  const cacheKey = `historical-${symbol.toUpperCase()}`;

  // Check cache (valid for 10 minutes in this example)
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 10 * 60 * 1000)) {
    return cache[cacheKey].data;
  }

  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${apiKey}`;
    const response = await axios.get(url);
    const timeSeries = response.data['Time Series (Daily)'] || {};

    // Convert to an array sorted by date (oldest to newest or vice versa)
    const result = Object.keys(timeSeries).map((date) => {
      const dayInfo = timeSeries[date];
      return {
        date,
        open: parseFloat(dayInfo['1. open']),
        high: parseFloat(dayInfo['2. high']),
        low: parseFloat(dayInfo['3. low']),
        close: parseFloat(dayInfo['4. close']),
        volume: parseInt(dayInfo['6. volume'], 10),
      };
    });

    // Sort by date ascending
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Cache result
    cache[cacheKey] = {
      data: result,
      timestamp: Date.now(),
    };

    return result;
  } catch (error) {
    console.error('Error fetching historical data:', error.message);
    throw new Error('Failed to fetch historical data');
  }
}

module.exports = {
  getRealTimeQuote,
  getHistoricalData,
};
