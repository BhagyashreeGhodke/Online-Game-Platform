// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
export const DB_NAME= "merndb"

// Connect to MongoDB (replace with your database connection URL)
mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware for parsing JSON requests
app.use(bodyParser.json());
// app.use('/auth', authRoutes);

// Define your User model (replace with your actual user schema)
const User = mongoose.model('User', {
    username: String,
    password: String,
});

// Secret key for JWT (replace with a secure secret key)
const JWT_SECRET_KEY = `${ACCESS_TOKEN_SECRET}`;

// Authentication endpoint
app.post('/auth/user/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database (replace with your actual query logic)
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

// Protected route example
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.userId });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token is missing' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
