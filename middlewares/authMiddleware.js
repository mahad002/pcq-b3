const jwt = require('jsonwebtoken');

// Middleware function to protect routes
exports.protect = (req, res, next) => {
    const authHeader = req.header('Authorization');

    // Check if the Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extract token from the header
    const token = authHeader.replace('Bearer ', '');

    // Check if token exists after extraction
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store decoded user data in request
        next(); // Call next middleware or route handler
    } catch (error) {
        // Handle invalid token
        res.status(401).json({ message: 'Token is not valid' });
    }
};
