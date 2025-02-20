// routes/adminAnalyticsRoutes.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { getAnalytics } = require('../controllers/adminAnalyticsController');

router.use(protect);
router.use(adminOnly);

// GET /api/admin/analytics
router.get('/', getAnalytics);

module.exports = router;
