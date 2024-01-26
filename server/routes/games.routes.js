// routes/games.js

const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Game = require('../models/game'); // Assuming you have a Game model

// Create a new game (protected route)
router.post('/games/create', verifyToken, async (req, res) => {
    try {
        // Access the user/admin ID from the request object
        const userId = req.userId;
        const adminId = req.adminId;

        // Check if the user or admin has the necessary permissions (replace with your actual logic)
        if (!userId && !adminId) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Create a new game (replace with your actual logic)
        const newGame = await Game.create({ /* game properties */ });

        res.json({ message: 'Game created successfully', game: newGame });
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Get all games
router.get('/games', async (req, res) => {
    try {
        // Fetch all games from the database (replace with your actual logic)
        const games = await Game.find();

        res.json({ games });
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add more game-related endpoints or middleware as needed

module.exports = router;
