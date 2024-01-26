// models/game.js

const mongoose = require('mongoose');
require('dotenv').config();

// Define the Game schema
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // Add more fields as needed for your game model
});

// Create the Game model
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
