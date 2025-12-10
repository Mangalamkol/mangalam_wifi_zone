// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);          // Admin/customer login
router.post('/register', authController.register);    // If you support registration
router.post('/refresh', authController.refreshToken);

module.exports = router;