// routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model

// Secret key for JWT (replace with your actual secret key)
const JWT_SECRET_KEY = `${ACCESS_TOKEN_SECRET}`;

// User login endpoint
router.post('/user/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add more authentication endpoints or middleware as needed

module.exports = router;
