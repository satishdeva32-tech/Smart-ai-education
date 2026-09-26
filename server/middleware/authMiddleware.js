const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
        token = req.cookies.token;
    }

    // Make sure token exists
    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({
            success: false,
            error: 'Not authorized to access this route: No token provided'
        });
    }

    try {
        // Verify token
        const secret = process.env.JWT_SECRET || 'edugenie_jwt_secret_fallback_key_2026';
        const decoded = jwt.verify(token, secret);

        if (mongoose.connection.readyState === 1) {
            req.user = await User.findById(decoded.id);
        } else {
            const memoryUsers = global.memoryUsers || new Map();
            req.user = memoryUsers.get(decoded.id) || {
                _id: decoded.id,
                id: decoded.id,
                name: 'Student',
                email: 'student@edugenie.ai',
                role: 'student',
                isOnboarded: true
            };
        }

        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized to access this route: User not found'
            });
        }

        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        return res.status(401).json({
            success: false,
            error: `Not authorized to access this route: ${err.message}`
        });
    }
};
