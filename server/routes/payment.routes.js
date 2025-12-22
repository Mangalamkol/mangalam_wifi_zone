import express from "express";
import { handlePaymentSuccess, createOrder } from "../controllers/razorpay.controller.js";

const router = express.Router();

// This route will be called by your client-side to create a new Razorpay order.
router.post("/orders", createOrder);

// This is your existing webhook handler for successful payments.
router.post("/webhook", handlePaymentSuccess);

export default router;
