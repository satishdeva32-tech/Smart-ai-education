const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// In-memory fallback store for serverless/demo environments when MongoDB is not configured
const memoryUsers = global.memoryUsers || new Map();
global.memoryUsers = memoryUsers;

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const cleanEmail = email ? email.toLowerCase().trim() : '';

        if (!cleanEmail || !password) {
            return res.status(400).json({ success: false, error: 'Please provide email and password' });
        }

        // If MongoDB is connected, use real MongoDB models
        if (mongoose.connection.readyState === 1) {
            const user = await User.create({
                name: name || 'Student',
                email: cleanEmail,
                password,
                role: role || 'student',
            });

            if (role === 'student' || !role) {
                try {
                    await StudentProfile.create({ user: user._id });
                } catch (e) {
                    console.warn('Student profile auto-create warning:', e.message);
                }
            }

            return sendTokenResponse(user, 201, res);
        }

        // Fallback: In-Memory / Serverless Store
        if (memoryUsers.has(cleanEmail)) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userId = 'mem_' + Date.now();

        const memoryUser = {
            _id: userId,
            id: userId,
            name: name || 'Student',
            email: cleanEmail,
            password: hashedPassword,
            role: role || 'student',
            isOnboarded: false,
            createdAt: new Date(),
        };

        memoryUsers.set(cleanEmail, memoryUser);
        memoryUsers.set(userId, memoryUser);

        sendTokenResponse(memoryUser, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }
        res.status(400).json({ success: false, error: err.message || 'Registration failed' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        const cleanEmail = email.toLowerCase().trim();

        // If MongoDB is connected, use real MongoDB query
        if (mongoose.connection.readyState === 1) {
            const user = await User.findOne({ email: cleanEmail }).select('+password');

            if (!user) {
                return res.status(401).json({ success: false, error: 'Invalid credentials' });
            }

            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(401).json({ success: false, error: 'Invalid credentials' });
            }

            return sendTokenResponse(user, 200, res);
        }

        // Fallback: In-Memory Store
        const memoryUser = memoryUsers.get(cleanEmail);
        if (!memoryUser) {
            // Auto-create or authenticate test user in demo mode for instant testing
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const userId = 'mem_' + Date.now();
            const autoUser = {
                _id: userId,
                id: userId,
                name: cleanEmail.split('@')[0] || 'User',
                email: cleanEmail,
                password: hashedPassword,
                role: 'student',
                isOnboarded: true,
                createdAt: new Date(),
            };
            memoryUsers.set(cleanEmail, autoUser);
            memoryUsers.set(userId, autoUser);
            return sendTokenResponse(autoUser, 200, res);
        }

        const isMatch = await bcrypt.compare(password, memoryUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(memoryUser, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message || 'Login failed' });
    }
};

// @desc    Update student profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        if (mongoose.connection.readyState === 1) {
            let profile = await StudentProfile.findOne({ user: req.user.id });

            if (!profile) {
                profile = await StudentProfile.create({ user: req.user.id });
            }

            profile = await StudentProfile.findOneAndUpdate(
                { user: req.user.id },
                req.body,
                { new: true, runValidators: true }
            );

            const user = await User.findByIdAndUpdate(
                req.user.id,
                { isOnboarded: true },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                data: profile,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isOnboarded: user.isOnboarded,
                }
            });
        }

        // Fallback for memory mode
        const memUser = memoryUsers.get(req.user.id) || req.user;
        memUser.isOnboarded = true;

        res.status(200).json({
            success: true,
            data: req.body,
            user: {
                id: memUser._id || memUser.id,
                name: memUser.name,
                email: memUser.email,
                role: memUser.role,
                isOnboarded: true,
            }
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    const secret = process.env.JWT_SECRET || 'edugenie_jwt_secret_fallback_key_2026';
    const userId = user._id ? user._id.toString() : user.id;

    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: '30d',
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user: {
            id: userId,
            name: user.name,
            email: user.email,
            role: user.role,
            isOnboarded: user.isOnboarded || false,
        },
    });
};
