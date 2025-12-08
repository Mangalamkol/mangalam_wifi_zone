const express = require('express');
const router = express.Router();
const {
  uploadCoupons,
  getAvailableCoupons,
  verifyCoupon,
  assignCoupon,
  disableExpired
} = require('../controllers/couponController');

const requireAdmin = require('../middleware/requireAdmin');

router.post('/upload', requireAdmin, uploadCoupons);
router.get('/available/:planId', getAvailableCoupons);
router.post('/verify', verifyCoupon);
router.post('/assign', assignCoupon);

// internal cron usage — protected
router.post('/disable-expired', requireAdmin, disableExpired);

module.exports = router;