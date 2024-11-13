const mongoose = require('mongoose');

// schema for storing URL analysis data
const urlAnalysisSchema = new mongoose.Schema({
    url: String, // URL to be analyzed
    result: mongoose.Schema.Types.Mixed, // analysis result
    date: { type: Date, default: Date.now } // date of analysis
}); 

// schema for storing code analysis data
const codeAnalysisSchema = new mongoose.Schema({
    codeSnippet: String, // code snippet to be analyzed
    analysisResult: mongoose.Schema.Types.Mixed, // analysis result
    date: { type: Date, default: Date.now } // date of analysis
});

// schema for storing GitHub repository analysis data
const githubRepoAnalysisSchema = new mongoose.Schema({
    repoUrl: String, // URL of the GitHub repository to be analyzed
    findings: mongoose.Schema.Types.Mixed, // analysis findings
    date: { type: Date, default: Date.now } // date of analysis
});

// Main user schema with new fields for name and contact
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // user's email (required and unique)
    password: { type: String, required: true }, // user's password (required)
    name: { type: String, default: '' }, // user's full name (optional, default to empty string)
    contact: { type: String, default: '' }, // user's contact information (optional, default to empty string)
    urlAnalysisHistory: [urlAnalysisSchema], // array to store URL analysis history
    codeAnalysisHistory: [codeAnalysisSchema], // array to store code analysis history
    githubRepoAnalysisHistory: [githubRepoAnalysisSchema] // array to store GitHub repository analysis history
});

module.exports = mongoose.model('User', userSchema); // export the User model
