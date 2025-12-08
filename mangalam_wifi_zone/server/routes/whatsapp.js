const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// webhook for incoming messages (business API)
router.post('/webhook', whatsappController.webhookHandler);

// send message endpoints (admin)
router.post('/send', whatsappController.sendMessage);

module.exports = router;