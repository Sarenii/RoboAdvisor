// services/portfolioMaintenanceService.js

const Portfolio = require('../models/portfolioModel');
const Notification = require('../models/notificationModel');
const { getRealTimeQuote } = require('./marketDataService');

/**
 * updateAllPortfolios:
 *  1) fetch all portfolios
 *  2) for each asset, get the real-time quote
 *  3) recalc the portfolio value
 *  4) if an asset's price changed significantly from last time, create a notification
 */
async function updateAllPortfolios() {
  const portfolios = await Portfolio.find({});
  for (const portfolio of portfolios) {
    let oldValue = portfolio.value;
    let newValue = 0;

    // We'll store old asset prices so we can see if they changed significantly
    const oldPrices = {};
    portfolio.assets.forEach((asset) => {
      oldPrices[asset.symbol] = asset.price;
    });

    // For each asset, fetch current price
    for (let i = 0; i < portfolio.assets.length; i++) {
      const asset = portfolio.assets[i];
      const quote = await getRealTimeQuote(asset.symbol);
      const newPrice = quote.price;

      // check if there's a big change
      if (oldPrices[asset.symbol]) {
        const oldPrice = oldPrices[asset.symbol];
        const pctChange = ((newPrice - oldPrice) / oldPrice) * 100;
        // if absolute change is above 5%, create a notification
        if (Math.abs(pctChange) >= 5) {
          await Notification.create({
            user: portfolio.user,
            message: `Asset ${asset.symbol} in portfolio "${portfolio.name}" changed by ${pctChange.toFixed(2)}%.`,
          });
        }
      }

      // set the new price
      portfolio.assets[i].price = newPrice;
      newValue += asset.shares * newPrice;
    }

    // update the portfolio's total value
    portfolio.value = newValue;
    await portfolio.save();

    // If the overall portfolio changed a lot, you could also create a notification
    const overallChange = ((newValue - oldValue) / (oldValue || 1)) * 100;
    if (Math.abs(overallChange) >= 5 && oldValue > 0) {
      await Notification.create({
        user: portfolio.user,
        message: `Portfolio "${portfolio.name}" changed by ${overallChange.toFixed(2)}%.`,
      });
    }
  }
}

module.exports = { updateAllPortfolios };
