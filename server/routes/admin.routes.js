// routes/admin.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin'); // Assuming you have an Admin model
const verifyToken = require('../middleware/verifyToken'); // Assuming you have a middleware for verifying JWT tokens

// Secret key for JWT (replace with your actual secret key)
const JWT_SECRET_KEY = `${ACCESS_TOKEN_SECRET}`;

// Admin login endpoint
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin in the database
        const admin = await Admin.findOne({ username, password });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Admin statistics endpoint (protected route)
router.get('/admin/statistics', verifyToken, async (req, res) => {
    try {
        // Fetch and return admin statistics (replace with your actual statistics logic)
        res.json({ message: 'Admin statistics endpoint', adminId: req.adminId });
    } catch (error) {
        console.error('Error fetching admin statistics:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add more admin-related endpoints or middleware as needed

module.exports = router;
