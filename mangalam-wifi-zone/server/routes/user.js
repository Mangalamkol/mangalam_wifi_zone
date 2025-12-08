const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAdmin, requireAuth } = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
// router.get('/me', requireAuth, userController.me);
// router.get('/', requireAdmin, userController.listUsers);
// router.put('/:id', requireAdmin, userController.updateUser);

module.exports = router;
