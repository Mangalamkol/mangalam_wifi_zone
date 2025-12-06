const express = require("express");
const router = express.Router();
const razorController = require("../controllers/razorController");

// Create order
router.post("/order", razorController.createOrder);

// Verify payment webhook
router.post("/webhook", razorController.handleWebhook);

module.exports = router;
