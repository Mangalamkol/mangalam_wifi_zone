const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.post('/send', whatsappController.sendMessage);
router.all('/webhooks', whatsappController.webhookHandler);

module.exports = router;
