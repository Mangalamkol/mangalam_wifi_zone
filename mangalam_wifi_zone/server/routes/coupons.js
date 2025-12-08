const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { requireAdmin } = require('../middleware/auth');

router.post('/upload', requireAdmin, couponController.uploadPdfAndParse); // admin PDF upload (200 codes)
router.get('/', requireAdmin, couponController.listCoupons);
router.delete('/:id', requireAdmin, couponController.deleteCoupon);

module.exports = router;