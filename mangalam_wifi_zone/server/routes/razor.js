const express = require('express');
const router = express.Router();
const razorController = require('../controllers/razorController');
const { verifyRazorWebhook } = require('../middleware/razorMiddleware'); // optional

// create order / payment
router.post('/create-order', razorController.createOrder); // create razorpay order
router.post('/verify', razorController.verifyPayment);     // call after payment from client

// webhook endpoint (Razorpay will POST here)
router.post('/webhook', verifyRazorWebhook, razorController.webhookHandler);

module.exports = router;