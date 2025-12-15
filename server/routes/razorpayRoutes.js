const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');
const { auth } = require('../middleware/authMiddleware');

// Create order (client -> server -> Razorpay)
router.post('/create-order', auth, razorpayController.createOrder);

// Verify payment (manual/after client)
router.post('/verify', auth, razorpayController.verifyPayment);

// Refund endpoint (admin)
router.post('/refund', auth, razorpayController.refundPayment);

module.exports = router;
