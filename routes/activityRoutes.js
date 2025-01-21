const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const {
    getLoginHistory,
    getUserAlerts,
    createAlert,
    updateNotificationPreferences,
    logActivity,
    getActivityLogs
} = require('../controllers/activityController');

const router = express.Router();

router.get('/login-history', protect, getLoginHistory);
router.get('/alerts', protect, getUserAlerts);
router.post('/alerts', protect, createAlert);
router.put('/notification-preferences', protect, updateNotificationPreferences);
router.post('/log', protect, logActivity);
router.get('/logs', protect, getActivityLogs);

module.exports = router;