/**
 * =========================================================
 * FILE: couponRoutes.js
 * STATUS: FINAL – DO NOT MODIFY
 * =========================================================
 */

import express from 'express';
import { verifyPayment } from '../services/paymentVerify.js';
import couponController from '../controllers/couponController.js';

const router = express.Router();

// This is the ONLY way to get a coupon now
router.post('/verify-payment', verifyPayment);

router.post('/recover', couponController.recoverCoupon);

export default router;
