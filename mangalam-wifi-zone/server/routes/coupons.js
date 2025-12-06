const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('pdf'), couponController.uploadCouponsPdf);
router.get('/check/:code', couponController.checkCoupon);

module.exports = router;
