const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// View login history
exports.getLoginHistory = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { email } = req.query;

        const user = await db.collection('data').findOne(
            { email },
            { projection: { loginActivity: 1 } }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ loginActivity: user.loginActivity || [] });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get user alerts
exports.getUserAlerts = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { email } = req.query;

        const alerts = await db.collection('alerts').find(
            { userEmail: email },
            { sort: { createdAt: -1 } }
        ).toArray();

        res.status(200).json({ alerts });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create new alert
exports.createAlert = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { userEmail, type, message } = req.body;

        const alert = {
            userEmail,
            type,
            message,
            createdAt: new Date(),
            read: false
        };

        await db.collection('alerts').insertOne(alert);
        res.status(201).json({ message: 'Alert created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { email, preferences } = req.body;

        await db.collection('data').updateOne(
            { email },
            { $set: { notificationPreferences: preferences } }
        );

        res.status(200).json({ message: 'Notification preferences updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Log user activity
exports.logActivity = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { email, action, details } = req.body;

        const activity = {
            email,
            action,
            details,
            timestamp: new Date(),
            ip: req.ip
        };

        await db.collection('activity_logs').insertOne(activity);
        res.status(201).json({ message: 'Activity logged successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get activity logs
exports.getActivityLogs = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const { email, startDate, endDate } = req.query;

        const query = { email };
        if (startDate && endDate) {
            query.timestamp = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        const logs = await db.collection('activity_logs')
            .find(query)
            .sort({ timestamp: -1 })
            .toArray();

        res.status(200).json({ logs });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};