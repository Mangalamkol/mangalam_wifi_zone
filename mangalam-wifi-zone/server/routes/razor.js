const express = require('express');
const router = express.Router();
const razorController = require('../controllers/razorController');

router.post('/orders', razorController.createOrder);
router.post('/webhooks', razorController.handleWebhook);

module.exports = router;
