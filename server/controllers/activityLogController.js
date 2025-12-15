const ActivityLog = require('../models/ActivityLog');

// @desc    Get all activity logs
// @route   GET /api/activity-logs
// @access  Private (for admins)
exports.getAllActivityLogs = async (req, res) => {
    try {
        const logs = await ActivityLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create an activity log
// @route   POST /api/activity-logs
// @access  Private (for admins)
exports.createActivityLog = async (req, res) => {
    const { action, adminUser, details } = req.body;

    try {
        const newLog = new ActivityLog({
            action,
            adminUser,
            details
        });

        const log = await newLog.save();
        res.json(log);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};