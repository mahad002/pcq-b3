const express = require('express');
const {
    registerUser,
    loginUser,
    addUrlAnalysis,
    addCodeAnalysis,
    addGithubRepoAnalysis,
    getAnalysisHistory,
    updateUserProfile,
    changeUserPassword,
    deleteUserAccount,
    sendPasswordRecoveryEmail,
    resetPassword,
    updateNotificationPreferences,
    getActiveSessions,
    terminateSession,
    deactivateAccount,
    assignUserRole,
    createGroup,
    assignUserToGroup,
    checkRole,
    getUserSettings
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { verifyCaptcha } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
// router.post('/login', verifyCaptcha, loginUser);
router.post('/login', loginUser);
router.post('/url-analysis', protect, addUrlAnalysis);
router.post('/code-analysis', protect, addCodeAnalysis);
router.post('/github-repo-analysis', protect, addGithubRepoAnalysis);
router.post('/history', protect, getAnalysisHistory);
router.put('/update-profile', protect, updateUserProfile);
router.put('/change-password', protect, changeUserPassword);
router.delete('/delete-account', protect, deleteUserAccount);
router.post('/recover-password', sendPasswordRecoveryEmail);
router.post('/reset-password', resetPassword);
router.put('/notification-preferences', protect, updateNotificationPreferences);
router.get('/active-sessions', protect, getActiveSessions);
router.post('/terminate-session', protect, terminateSession);
router.post('/deactivate-account', protect, deactivateAccount);
router.put('/assign-role', protect, checkRole('admin'), assignUserRole);
router.post('/create-group', protect, checkRole('admin'), createGroup);
router.put('/assign-group', protect, checkRole('admin'), assignUserToGroup);
router.get('/settings', protect, getUserSettings);

module.exports = router;
