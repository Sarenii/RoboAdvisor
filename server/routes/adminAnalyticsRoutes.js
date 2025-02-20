const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getAnalytics } = require('../controllers/adminAnalyticsController');

router.use(protect);
router.use(adminOnly);

router.get('/', getAnalytics);

module.exports = router;
