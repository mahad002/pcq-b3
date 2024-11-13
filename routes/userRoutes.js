const express = require('express');
const { registerUser, loginUser, addUrlAnalysis, addCodeAnalysis, addGithubRepoAnalysis, getAnalysisHistory } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/url-analysis', protect, addUrlAnalysis);
router.post('/code-analysis', protect, addCodeAnalysis);
router.post('/github-repo-analysis', protect, addGithubRepoAnalysis);
router.post('/history', protect, getAnalysisHistory);
router.put('/update-profile', userController.updateUserProfile);
router.put('/change-password', userController.changeUserPassword);
router.delete('/delete-account', userController.deleteUserAccount);


module.exports = router;
