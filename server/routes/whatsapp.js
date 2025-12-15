const express = require('express');
const router = express.Router();
const { sendCouponMessage, sendText, webhookHandler } = require('../controllers/whatsappController');

router.post('/send-coupon', sendCouponMessage);
router.post('/send-text', sendText);
router.post('/webhook', webhookHandler);

module.exports = router;
