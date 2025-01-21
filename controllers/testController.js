const jwt = require('jsonwebtoken');

// User Controller Test Endpoints
exports.testRegister = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('data').find().toArray();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testLogin = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.collection('data').find({}, { projection: { email: 1, password: 1 } }).toArray();
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testUrlAnalysis = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const analyses = await db.collection('data').find({}, { projection: { urlAnalysisHistory: 1 } }).toArray();
        res.status(200).json({ analyses });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testCodeAnalysis = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const analyses = await db.collection('data').find({}, { projection: { codeAnalysisHistory: 1 } }).toArray();
        res.status(200).json({ analyses });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testGithubRepoAnalysis = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const analyses = await db.collection('data').find({}, { projection: { githubRepoAnalysisHistory: 1 } }).toArray();
        res.status(200).json({ analyses });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testAnalysisHistory = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const history = await db.collection('data').find({}, {
            projection: {
                urlAnalysisHistory: 1,
                codeAnalysisHistory: 1,
                githubRepoAnalysisHistory: 1
            }
        }).toArray();
        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testUserProfile = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const profiles = await db.collection('data').find({}, {
            projection: {
                name: 1,
                email: 1,
                contact: 1
            }
        }).toArray();
        res.status(200).json({ profiles });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testUserGroups = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const groups = await db.collection('groups').find().toArray();
        res.status(200).json({ groups });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testUserRoles = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const roles = await db.collection('data').find({}, { projection: { email: 1, role: 1 } }).toArray();
        res.status(200).json({ roles });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Activity Controller Test Endpoints
exports.testLoginHistory = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const loginHistory = await db.collection('data').find({}, { projection: { loginActivity: 1 } }).toArray();
        res.status(200).json({ loginHistory });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testAlerts = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const alerts = await db.collection('alerts').find().toArray();
        res.status(200).json({ alerts });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testNotificationPreferences = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const preferences = await db.collection('data').find({}, { projection: { notificationPreferences: 1 } }).toArray();
        res.status(200).json({ preferences });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testActivityLogs = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const logs = await db.collection('activity_logs').find().toArray();
        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.testActiveSessions = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const sessions = await db.collection('data').find({}, { projection: { activeSessions: 1 } }).toArray();
        res.status(200).json({ sessions });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};