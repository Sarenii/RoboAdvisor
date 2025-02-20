// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

// All profile routes require authentication
router.use(protect);

router.get('/', getProfile);      // GET /api/profile
router.put('/', updateProfile);   // PUT /api/profile

module.exports = router;
