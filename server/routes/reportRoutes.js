// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');

router.use(protect);
router.get('/', generateReport); // GET /api/report

module.exports = router;
