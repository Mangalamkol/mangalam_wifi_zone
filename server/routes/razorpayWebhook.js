const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');

// Webhook endpoint (Razorpay will POST here)
router.post('/', express.raw({ type: 'application/json' }), razorpayController.webhookHandler);

module.exports = router;
