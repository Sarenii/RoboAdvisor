// routes/marketDataRoutes.js
const express = require('express');
const router = express.Router();
const { getQuote, getHistory } = require('../controllers/marketDataController');

// If you wish to restrict access to authenticated users, uncomment the next two lines:
// const { protect } = require('../middleware/authMiddleware');
// router.use(protect);

router.get('/quote/:symbol', getQuote);
router.get('/history/:symbol', getHistory);

module.exports = router;
