const axios = require('axios');
exports.checkRole = (requiredRole) => {
    return async (req, res, next) => {
        const { email } = req.body;

        try {
            const db = req.app.locals.db;
            const user = await db.collection('data').findOne({ email });

            if (!user || user.role !== requiredRole) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    };
};
const jwt = require('jsonwebtoken');

// Middleware function to protect routes
exports.protect = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log(authHeader);    

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
        console.log(decoded);
        next(); // Call next middleware or route handler
    } catch (error) {
        // Handle invalid token
        res.status(401).json({ message: 'Token is not valid' });
    }
};

exports.verifyCaptcha = async (req, res, next) => {
    const { captchaToken } = req.body;

    if (!captchaToken) {
        return res.status(400).json({ message: 'Captcha token is missing' });
    }

    try {
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY, // Your secret key
                    response: captchaToken, // Token from frontend
                },
            }
        );

        if (!response.data.success) {
            return res.status(400).json({ message: 'Captcha verification failed' });
        }

        next(); // Proceed to the login controller
    } catch (error) {
        console.error('Captcha verification error:', error);
        res.status(500).json({ message: 'Captcha verification error' });
    }
};