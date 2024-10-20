const express = require('express');
const { registerUser, loginUser, addUrlAnalysis, addCodeAnalysis, addGithubRepoAnalysis, getAnalysisHistory } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/url-analysis', protect, addUrlAnalysis);
router.post('/code-analysis', protect, addCodeAnalysis);
router.post('/github-repo-analysis', protect, addGithubRepoAnalysis);
router.post('/history', protect, getAnalysisHistory);

module.exports = router;
