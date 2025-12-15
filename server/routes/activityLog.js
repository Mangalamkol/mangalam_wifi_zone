const express = require('express');
const router = express.Router();
const { getAllActivityLogs, createActivityLog } = require('../controllers/activityLogController');
const admin = require('../middlewares/adminAuth');

// GET all activity logs
router.get('/', admin, getAllActivityLogs);

// POST create a new activity log
router.post('/', admin, createActivityLog);

module.exports = router;