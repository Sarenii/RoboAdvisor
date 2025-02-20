const axios = require('axios');

/**
 * Example advanced logic for recommending an allocation:
 * - We read the user's goal (timeHorizon in years, targetReturn).
 * - We read the user's riskTolerance (Low/Mod/High).
 * - We fetch some asset data from your marketDataService.
 * - We produce an array of {symbol, shares, price}.
 */
async function advancedAllocate({ riskTolerance, timeHorizon, targetReturn }) {
  // 1. Base your logic on risk + time horizon
  //    This is just a toy example for demonstration.

  let allocation = [];
  if (riskTolerance === 'Low') {
    // Weighted more in bonds, stable ETFs
    allocation = [
      { symbol: 'BND', weight: 0.6 },
      { symbol: 'SPY', weight: 0.4 },
    ];
  } else if (riskTolerance === 'High') {
    allocation = [
      { symbol: 'QQQ', weight: 0.7 },
      { symbol: 'ARKK', weight: 0.3 },
    ];
  } else {
    allocation = [
      { symbol: 'SPY', weight: 0.5 },
      { symbol: 'QQQ', weight: 0.5 },
    ];
  }

  // 2. Optionally adjust weights by timeHorizon or targetReturn
  //    e.g. if user has short horizon, reduce stock portion.

  // 3. For each symbol in allocation, fetch the current price (marketDataService)
  //    Then convert the "weight" to actual shares or value.
  //    We'll assume the user invests $10,000 total for demonstration.

  const totalCapital = 10000;
  const finalAssets = [];

  for (const item of allocation) {
    const price = await fetchPrice(item.symbol); // call your service
    const capital = totalCapital * item.weight;
    const shares = Math.floor(capital / price);

    finalAssets.push({
      symbol: item.symbol,
      shares,
      price,
    });
  }

  return finalAssets;
}

// Example function to fetch a price
async function fetchPrice(symbol) {
  // call your existing marketDataService
  const { getRealTimeQuote } = require('../services/marketDataService');
  const quote = await getRealTimeQuote(symbol);
  return quote.price;
}

module.exports = { advancedAllocate };
