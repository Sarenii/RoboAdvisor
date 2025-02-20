const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

router.use(protect);

router.get('/', getNotifications);
router.put('/:id/read', markAsRead);

module.exports = router;
