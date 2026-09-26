const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser (increased limit for base64 image uploads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true
}));

// Ensure DB is connected for serverless invocations
app.use(async (req, res, next) => {
    try {
        await connectDB();
    } catch (err) {
        console.warn('DB Connection Attempt Warning:', err.message);
    }
    next();
});

// Mount routers
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/agent', require('./routes/agentRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

const mongoose = require('mongoose');
app.get('/api/health', (req, res) => res.status(200).json({
    success: true,
    status: 'ok',
    dbState: mongoose.connection.readyState,
    dbHost: mongoose.connection.host,
    dbPort: mongoose.connection.port,
    dbName: mongoose.connection.name
}));

const path = require('path');
const PORT = process.env.PORT || 5000;

// Serve static assets in production from the project root `public` folder
if (process.env.NODE_ENV === 'production') {
    const publicPath = path.join(__dirname, '..', 'public');
    app.use(express.static(publicPath));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}

if (!process.env.VERCEL) {
    const server = app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });

    // Init Socket.io for real-time features
    const initSocket = require('./services/socketService');
    initSocket(server);
}

module.exports = app;
