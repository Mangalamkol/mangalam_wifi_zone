// server/routes/voucherRoutes.js
const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');
const { auth, requireAdmin } = require('../middleware/authMiddleware');

// Public routes
router.post('/redeem', voucherController.redeemVoucher); // OTP-based retrieval or direct
router.get('/:code', voucherController.getVoucherByCode);

// OTP routes for voucher viewing
router.post('/otp/request', voucherController.requestOtp); // request OTP to view
router.post('/otp/verify', voucherController.verifyOtp);   // verify OTP to fetch voucher

// Admin routes
router.post('/upload/:planId', auth, requireAdmin, voucherController.uploadVouchers);
router.post('/:id/disable', auth, requireAdmin, voucherController.disableVoucher);
router.get('/plan/:planId', auth, requireAdmin, voucherController.getVouchersByPlan);

module.exports = router;
