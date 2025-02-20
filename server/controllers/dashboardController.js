// controllers/dashboardController.js
const Portfolio = require('../models/portfolioModel');

/**
 * Helper function to calculate portfolio value from its assets.
 */
function calculatePortfolioValue(assets) {
  return assets.reduce((total, asset) => total + asset.shares * asset.price, 0);
}

/**
 * Helper function to compute the number of months between two dates.
 */
function monthsBetween(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  let months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 1 : months;
}

/**
 * GET /api/dashboard
 * Computes real dashboard data for the authenticated user.
 * 
 * For each portfolio, if an "investmentAmount" is provided,
 * the monthly return is computed as:
 *   monthlyReturn = (currentValue - investmentAmount) / investmentAmount / monthsSinceCreation.
 * 
 * The overall monthly return is the weighted average across all portfolios.
 * Risk level is taken from the user's profile (req.user.riskTolerance) if available.
 */
exports.getDashboardData = async (req, res) => {
  try {
    // Fetch all portfolios for the user.
    const portfolios = await Portfolio.find({ user: req.user._id });
    
    let totalValue = 0;
    let totalInvested = 0;
    let weightedReturnSum = 0;
    
    portfolios.forEach((pf) => {
      const pfValue = calculatePortfolioValue(pf.assets);
      totalValue += pfValue;
      
      if (pf.investmentAmount && pf.investmentAmount > 0) {
        const monthsElapsed = monthsBetween(pf.createdAt, new Date());
        const pfMonthlyReturn = (pfValue - pf.investmentAmount) / pf.investmentAmount / monthsElapsed;
        // Weight the return by the invested amount.
        weightedReturnSum += pfMonthlyReturn * pf.investmentAmount;
        totalInvested += pf.investmentAmount;
      }
    });
    
    // Compute overall weighted monthly return.
    const overallMonthlyReturn = totalInvested > 0 ? weightedReturnSum / totalInvested : 0;
    
    // Use the risk tolerance from the user's profile (if not set, default to 'Moderate')
    const riskLevel = req.user.riskTolerance || 'Moderate';
    
    // You could also pull recent activity from notifications or logs; here we'll return an empty array.
    const recentActivities = [];
    
    res.json({
      totalValue,
      monthlyReturn: overallMonthlyReturn,
      riskLevel,
      recentActivities,
    });
  } catch (err) {
    console.error('Dashboard fetch error:', err.message);
    res.status(500).json({ message: 'Failed to load dashboard data' });
  }
};
