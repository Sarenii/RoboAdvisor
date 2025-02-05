const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected route to get current user
router.get('/current', protect, getCurrentUser);

module.exports = router;
