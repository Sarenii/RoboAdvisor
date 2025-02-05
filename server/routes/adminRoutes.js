const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  deactivateUser,
  promoteUser,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Admin routes require token + admin role
router.use(protect);
router.use(adminOnly);

router.get('/users', getAllUsers);
router.put('/users/:id/deactivate', deactivateUser);
router.put('/users/:id/promote', promoteUser);

module.exports = router;
