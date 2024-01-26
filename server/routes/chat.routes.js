// routes/chat.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken'); // Assuming you have a middleware for verifying JWT tokens

// Sample chat data (replace with your actual data storage or database logic)
let chatHistory = [];

// Send a message (protected route)
router.post('/chat/send', verifyToken, (req, res) => {
    try {
        // Access the user/admin ID from the request object
        const userId = req.userId;
        const adminId = req.adminId;

        // Check if the user or admin has the necessary permissions (replace with your actual logic)
        if (!userId && !adminId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Get the message from the request body
        const { message } = req.body;

        // Add the message to the chat history
        chatHistory.push({ userId, adminId, message, timestamp: new Date() });

        res.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get chat history (protected route)
router.get('/chat/history', verifyToken, (req, res) => {
    try {
        // Access the user/admin ID from the request object
        const userId = req.userId;
        const adminId = req.adminId;

        // Check if the user or admin has the necessary permissions (replace with your actual logic)
        if (!userId && !adminId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Return the chat history
        res.json({ chatHistory });
    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add more chat-related endpoints or middleware as needed

module.exports = router;
