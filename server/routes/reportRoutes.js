const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');

router.use(protect);
router.get('/', generateReport);

module.exports = router;
