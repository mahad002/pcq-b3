const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');

// register a new user
exports.registerUser = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const db = req.app.locals.db;
        const userExists = await db.collection('data').findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: username,
            email,
            password: hashedPassword,
            urlAnalysisHistory: [],
            codeAnalysisHistory: [],
            githubRepoAnalysisHistory: []
        };

        const result = await db.collection('data').insertOne(newUser);

        res.status(201).json({ userId: result.insertedId, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// login a user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = req.app.locals.db;
        const user = await db.collection('data').findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// add URL analysis result
exports.addUrlAnalysis = async (req, res) => {
    const { email, url, result } = req.body;

    try {
        const db = req.app.locals.db;

        // Check if the URL already exists in the user's urlAnalysisHistory
        const user = await db.collection('data').findOne(
            { email, 'urlAnalysisHistory.url': url },
            { projection: { 'urlAnalysisHistory.$': 1 } }
        );

        if (user && user.urlAnalysisHistory.length > 0) {
            return res.status(200).json({ message: 'URL analysis result already exists' });
        }

        await db.collection('data').updateOne(
            { email },
            { $push: { urlAnalysisHistory: { url, result, date: new Date() } } }
        );

        res.status(200).json({ message: 'URL analysis result added' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// add code analysis result
exports.addCodeAnalysis = async (req, res) => {
    const { email, codeSnippet, analysisResult } = req.body;

    try {
        const db = req.app.locals.db;

        await db.collection('data').updateOne(
            { email },
            { $push: { codeAnalysisHistory: { codeSnippet, analysisResult, date: new Date() } } }
        );

        res.status(200).json({ message: 'Code analysis result added' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// add GitHub repo analysis result
exports.addGithubRepoAnalysis = async (req, res) => {
    const { email, repoUrl, findings } = req.body;

    try {
        const db = req.app.locals.db;

        await db.collection('data').updateOne(
            { email },
            { $push: { githubRepoAnalysisHistory: { repoUrl, findings, date: new Date() } } }
        );

        res.status(200).json({ message: 'GitHub repo analysis result added' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// get analysis history
exports.getAnalysisHistory = async (req, res) => {
    // Get email and token from the request body
    const { email, token } = req.body;

    // Check if both email and token are provided
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    // If you're still expecting a token in the body
    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        const db = req.app.locals.db;

        // Fetch the user based on the email
        const user = await db.collection('data').findOne(
            { email: email },
            {
                projection: {
                    urlAnalysisHistory: 1,
                    codeAnalysisHistory: 1,
                    githubRepoAnalysisHistory: 1,
                },
            }
        );

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user's analysis history
        res.status(200).json({
            urlAnalysisHistory: user.urlAnalysisHistory,
            codeAnalysisHistory: user.codeAnalysisHistory,
            githubRepoAnalysisHistory: user.githubRepoAnalysisHistory,
        });
    } catch (error) {
        console.error('Error fetching analysis history:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    const { email } = req.body;

    try {
        const db = req.app.locals.db;

        // Delete the user from the database
        const result = await db.collection('data').deleteOne({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Change user password
exports.changeUserPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        const db = req.app.locals.db;

        // Find the user by email
        const user = await db.collection('data').findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password and update it in the database
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await db.collection('data').updateOne(
            { email },
            { $set: { password: hashedNewPassword } }
        );

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update user details
exports.updateUserProfile = async (req, res) => {
    const { email, name, contact } = req.body;
    console.log(email, name, contact);
    try {
        const db = req.app.locals.db;

        // Construct the update object based on provided fields
        const updateFields = {};
        if (name) updateFields.name = name;
        if (contact) updateFields.contact = contact;

        // Update user details in the database
        const result = await db.collection('data').updateOne(
            { email },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
