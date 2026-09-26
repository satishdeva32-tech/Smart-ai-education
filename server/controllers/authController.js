const User = require('../models/User');
const StudentProfile = require('../models/StudentProfile');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;
        const cleanEmail = email ? email.toLowerCase().trim() : '';

        // Create user
        const user = await User.create({
            name,
            email: cleanEmail,
            password,
            role,
        });

        // If student, create profile
        if (role === 'student') {
            await StudentProfile.create({ user: user._id });
        }

        sendTokenResponse(user, 201, res);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, error: 'Email is already registered' });
        }
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ success: false, error: 'Please provide an email and password' });
        }

        const cleanEmail = email.toLowerCase().trim();

        // Check for user
        const user = await User.findOne({ email: cleanEmail }).select('+password');

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update student profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        let profile = await StudentProfile.findOne({ user: req.user.id });

        if (!profile) {
            profile = await StudentProfile.create({ user: req.user.id });
        }

        profile = await StudentProfile.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true, runValidators: true }
        );

        // Mark user as onboarded
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { isOnboarded: true },
            { new: true }
        );

        res.status(200).json({
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
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const secret = process.env.JWT_SECRET || 'edugenie_jwt_secret_fallback_key_2026';
    const token = jwt.sign({ id: user._id }, secret, {
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
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isOnboarded: user.isOnboarded,
        },
    });
};
