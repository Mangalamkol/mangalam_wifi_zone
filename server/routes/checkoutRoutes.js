import express from 'express';
import razorpayController from '../controllers/razorpayController.js';

const router = express.Router();

// Route to handle the checkout process and create a coupon
router.post('/checkout', razorpayController.createOrder);

export default router;
