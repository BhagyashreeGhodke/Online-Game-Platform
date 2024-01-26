// models/user.js

const mongoose = require('mongoose');
require('dotenv').config();

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Add more fields as needed for your user model
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
