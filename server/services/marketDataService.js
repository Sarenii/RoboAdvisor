const axios = require('axios');

const finnhubApiKey = process.env.FINNHUB_API_KEY;

// Simple in-memory cache to reduce API calls
const cache = {};

/**
 * Fetch real-time quote using Finnhub.
 * Finnhub returns data with fields:
 *   c: current price, d: change, dp: change percent, etc.
 */
async function getRealTimeQuoteFinnhub(symbol) {
  const cacheKey = `finnhub-realtime-${symbol.toUpperCase()}`;
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 2 * 60 * 1000)) {
    return cache[cacheKey].data;
  }
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`;
    const response = await axios.get(url);
    console.log(`Finnhub raw response for ${symbol}:`, response.data); // Debug log

    const data = response.data;
    const result = {
      symbol: symbol.toUpperCase(),
      price: parseFloat(data.c) || 0,
      change: parseFloat(data.d) || 0,
      changePercent: parseFloat(data.dp) || 0,
      timestamp: new Date().toISOString(),
    };

    cache[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error('Error fetching real-time quote from Finnhub:', error.message);
    throw new Error('Failed to fetch real-time quote');
  }
}

/**
 * Fetch historical daily data using Finnhub.
 * Uses a 30-day range to avoid potential 403 errors.
 */
async function getHistoricalDataFinnhub(symbol) {
  const cacheKey = `finnhub-historical-${symbol.toUpperCase()}`;
  if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp < 10 * 60 * 1000)) {
    return cache[cacheKey].data;
  }
  try {
    const end = Math.floor(Date.now() / 1000);
    // Fetch historical data for the past 30 days
    const start = end - 30 * 24 * 60 * 60;
    const url = `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=D&from=${start}&to=${end}&token=${finnhubApiKey}`;
    const response = await axios.get(url);
    console.log(`Finnhub historical raw response for ${symbol}:`, response.data); // Debug log
    if (response.data.s !== 'ok') {
      throw new Error('Historical data not available');
    }
    const times = response.data.t;
    const closes = response.data.c;
    const result = times.map((time, idx) => ({
      date: new Date(time * 1000).toISOString().split('T')[0],
      close: closes[idx],
    }));
    cache[cacheKey] = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error('Error fetching historical data from Finnhub:', error.message);
    throw new Error('Failed to fetch historical data');
  }
}

module.exports = {
  getRealTimeQuote: getRealTimeQuoteFinnhub,
  getHistoricalData: getHistoricalDataFinnhub,
};
