// routes/marketDataRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getQuote, getHistory } = require('../controllers/marketDataController');

// If you'd like to require login for accessing market data, use 'protect'.
// Otherwise, comment out protect() for public access.
router.get('/quote/:symbol', getQuote);
router.get('/history/:symbol', getHistory);

module.exports = router;
