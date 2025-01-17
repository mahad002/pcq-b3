const mongoose = require('mongoose');

// schema for storing URL analysis data
const urlAnalysisSchema = new mongoose.Schema({
    url: String,
    result: mongoose.Schema.Types.Mixed,
    date: { type: Date, default: Date.now }
});

// schema for storing code analysis data
const codeAnalysisSchema = new mongoose.Schema({
    codeSnippet: String,
    analysisResult: mongoose.Schema.Types.Mixed,
    date: { type: Date, default: Date.now }
});

// schema for storing GitHub repository analysis data
const githubRepoAnalysisSchema = new mongoose.Schema({
    repoUrl: String,
    findings: mongoose.Schema.Types.Mixed,
    date: { type: Date, default: Date.now }
});

// Main user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: '' },
    contact: { type: String, default: '' },
    urlAnalysisHistory: [urlAnalysisSchema],
    codeAnalysisHistory: [codeAnalysisSchema],
    githubRepoAnalysisHistory: [githubRepoAnalysisSchema],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    notificationPreferences: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false }
    },
    isActive: { type: Boolean, default: true },
    loginActivity: [
        {
            ip: String,
            device: String,
            date: { type: Date, default: Date.now },
            success: { type: Boolean, default: true }
        }
    ],
    role: {
        type: String,
        enum: ['admin', 'user', 'editor', 'viewer'],
        default: 'user'
    },
    activeSessions: [
        {
            sessionId: String,
            device: String,
            ip: String,
            lastActive: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
