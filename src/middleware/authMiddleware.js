const jwt = require('jsonwebtoken');

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();  // Continue to the protected route
    } catch (err) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authenticateJWT;
