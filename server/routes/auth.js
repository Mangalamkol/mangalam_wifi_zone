// server/routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
// router.post('/refresh', authController.refreshToken); // Commented out for now

module.exports = router;
