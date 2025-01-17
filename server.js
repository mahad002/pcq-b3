const express = require('express'); // Import the express module
const { MongoClient } = require('mongodb'); // Import the MongoClient from the mongodb module
const dotenv = require('dotenv'); // Import the dotenv module for environment variables
const cors = require('cors'); // Import the cors module
const userRoutes = require('./routes/userRoutes'); // Import the userRoutes module

dotenv.config(); // Load environment variables from .env file
const app = express(); // Create an instance of the express application
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

const uri = process.env.MONGO_URI; // Get the MongoDB connection URI from environment variables
const client = new MongoClient(uri); // Create a new MongoClient instance

async function connectToDatabase() {
    try {
        await client.connect(); // Connect to the MongoDB server
        const db = client.db("mydb"); // Get the "mydb" database
        app.locals.db = db; // Make the database accessible to the application
        console.log("Connected to MongoDB!")
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

app.get('/api/test', (req, res) => {
    res.send('Backend is running!');
});

connectToDatabase(); // Connect to the database

app.use('/api/users', userRoutes); // Mount the userRoutes middleware at '/api/users' path

const PORT = process.env.PORT || 8002; // Get the port number from environment variables or use 8002 as default
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server and listen on the specified port
