// middleware/verifyToken.js

const jwt = require('jsonwebtoken');
require('dotenv').config();


// Secret key for JWT (replace with your actual secret key)
const JWT_SECRET_KEY = `${ACCESS_TOKEN_SECRET}`;
function verifyToken(req, res, next) {
    // Extract the token from the Authorization header
    const token = jwt.sign({ user: 'example' }, process.env.ACCESS_TOKEN_SECRET);

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        // Attach the decoded user/admin ID to the request object for further use
        req.userId = decoded.userId;
        req.adminId = decoded.adminId;

        // Continue to the next middleware or route handler
        next();
    });
}

module.exports = verifyToken;
