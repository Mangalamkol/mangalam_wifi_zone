// server/routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');
const { auth } = require('../middleware/authMiddleware');

// Webhook verification
router.get('/webhook', whatsappController.verifyWebhook);

// Webhook for incoming whatsapp messages (if used)
router.post('/webhook', whatsappController.incomingWebhook);

// send coupon via whatsapp after purchase (server triggered)
router.post('/send-coupon', auth, whatsappController.sendCouponToPhone);

module.exports = router;
