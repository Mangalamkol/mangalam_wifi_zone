const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { auth, requireAdmin } = require('../middleware/authMiddleware');

// All routes are protected and require admin access
router.use(auth, requireAdmin);

router.post('/', couponController.create);
router.get('/', couponController.getAll);
router.get('/:id', couponController.getById);
router.patch('/:id', couponController.update);
router.delete('/:id', couponController.delete);

module.exports = router;