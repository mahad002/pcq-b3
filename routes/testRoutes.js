const express = require('express');
const {
    // User Controller Tests
    testRegister,
    testLogin,
    testUrlAnalysis,
    testCodeAnalysis,
    testGithubRepoAnalysis,
    testAnalysisHistory,
    testUserProfile,
    testUserGroups,
    testUserRoles,
    
    // Activity Controller Tests
    testLoginHistory,
    testAlerts,
    testNotificationPreferences,
    testActivityLogs,
    testActiveSessions
} = require('../controllers/testController');

const router = express.Router();

// User Routes Tests
router.get('/users/register', testRegister);
router.get('/users/login', testLogin);
router.get('/users/url-analysis', testUrlAnalysis);
router.get('/users/code-analysis', testCodeAnalysis);
router.get('/users/github-repo-analysis', testGithubRepoAnalysis);
router.get('/users/analysis-history', testAnalysisHistory);
router.get('/users/profile', testUserProfile);
router.get('/users/groups', testUserGroups);
router.get('/users/roles', testUserRoles);

// Activity Routes Tests
router.get('/activity/login-history', testLoginHistory);
router.get('/activity/alerts', testAlerts);
router.get('/activity/notification-preferences', testNotificationPreferences);
router.get('/activity/logs', testActivityLogs);
router.get('/activity/sessions', testActiveSessions);

module.exports = router;