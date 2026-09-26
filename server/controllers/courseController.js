const mongoose = require('mongoose');

const DEFAULT_COURSES = [
    {
        _id: 'c1',
        title: 'Mastering Machine Learning & Deep Learning',
        description: 'Comprehensive curriculum covering neural networks, transformers, and deployment.',
        category: 'AI / Data Science',
        level: 'Intermediate',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80',
        videos: [{ title: 'Intro to Neural Architectures', url: 'https://www.youtube.com/watch?v=aircAruvnKk', duration: '18:24' }]
    },
    {
        _id: 'c2',
        title: 'Full Stack React & Modern Cloud Architecture',
        description: 'Build enterprise-grade microservices and modern React applications with state management.',
        category: 'Software Engineering',
        level: 'Beginner',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
        videos: [{ title: 'Fullstack Microservices Blueprint', url: 'https://www.youtube.com/watch?v=7CqJlxBYj-M', duration: '24:10' }]
    }
];

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
exports.getCourses = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const courses = await Course.find();
            if (courses.length > 0) {
                return res.status(200).json({
                    success: true,
                    count: courses.length,
                    data: courses
                });
            }
        }
        res.status(200).json({
            success: true,
            count: DEFAULT_COURSES.length,
            data: DEFAULT_COURSES
        });
    } catch (err) {
        res.status(200).json({ success: true, count: DEFAULT_COURSES.length, data: DEFAULT_COURSES });
    }
};

// @desc    Get single course with enrollment status
// @route   GET /api/courses/:id
// @access  Private/Public
exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }

        let enrollment = null;
        if (req.user) {
            enrollment = await Enrollment.findOne({ user: req.user.id, course: req.params.id });
        }

        res.status(200).json({
            success: true,
            data: course,
            enrollment
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Enroll in a course
// @route   POST /api/courses/enroll/:id
// @access  Private
exports.enrollCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ success: false, error: 'Course not found' });
        }

        let enrollment = await Enrollment.findOne({ user: req.user.id, course: req.params.id });

        if (enrollment) {
            return res.status(400).json({ success: false, error: 'User already enrolled' });
        }

        enrollment = await Enrollment.create({
            user: req.user.id,
            course: req.params.id
        });

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Update video progress
// @route   PUT /api/courses/progress/:id
// @access  Private
exports.updateProgress = async (req, res) => {
    try {
        const { videoIndex } = req.body;

        const enrollment = await Enrollment.findOne({ user: req.user.id, course: req.params.id });

        if (!enrollment) {
            return res.status(404).json({ success: false, error: 'Enrollment not found' });
        }

        if (!enrollment.completedVideos.includes(videoIndex)) {
            enrollment.completedVideos.push(videoIndex);

            const course = await Course.findById(req.params.id);
            const totalVideos = course.videos.length;
            enrollment.progress = Math.round((enrollment.completedVideos.length / totalVideos) * 100);

            if (enrollment.progress === 100) {
                enrollment.status = 'completed';
            }
        }

        enrollment.lastAccessed = Date.now();
        await enrollment.save();

        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// @desc    Get user enrollments
// @route   GET /api/courses/my-courses
// @access  Private
exports.getMyCourses = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user: req.user.id }).populate('course');

        res.status(200).json({
            success: true,
            data: enrollments
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
