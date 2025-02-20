const express = require('express');
const router = express.Router();
const { getAllUsers, deactivateUser, promoteUser, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Protect all admin routes and require admin role
router.use(protect);
router.use(adminOnly);

router.get('/users', getAllUsers);
router.put('/users/:id/deactivate', deactivateUser);
router.put('/users/:id/promote', promoteUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
