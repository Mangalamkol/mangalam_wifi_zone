import express from 'express';
const router = express.Router();
import couponController from '../controllers/couponController.js';

// Route to handle the checkout process and create a coupon
router.post('/checkout', couponController.checkout);

export default router;
