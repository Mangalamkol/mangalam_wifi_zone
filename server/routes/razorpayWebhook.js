const express = require('express');
const router = express.Router();
const razorpayController = require('../controllers/razorpayController');
const verifyWebhook = require('../middleware/verifyWebhook');

// Webhook endpoint (Razorpay will POST here)
router.post('/', express.raw({ type: 'application/json' }), verifyWebhook, razorpayController.webhookHandler);

module.exports = router;
