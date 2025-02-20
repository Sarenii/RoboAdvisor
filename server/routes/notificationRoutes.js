// routes/notificationRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getNotifications, markAsRead } = require('../controllers/notificationController');

router.use(protect);

router.get('/', getNotifications);           // GET /api/notifications
router.put('/:id/read', markAsRead);         // PUT /api/notifications/:id/read

module.exports = router;
