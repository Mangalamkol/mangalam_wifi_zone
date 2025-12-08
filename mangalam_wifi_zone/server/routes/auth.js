const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// public
router.post('/login', authController.login);         // { username/password } -> token
router.post('/refresh', authController.refreshToken); // refresh JWT if implemented

// admin-protected examples (middleware should be applied in controller or here)
router.post('/register', authController.register); // create admin user or operator

module.exports = router;