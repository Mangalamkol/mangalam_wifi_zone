import express from 'express';
const router = express.Router();
import couponController from '../controllers/couponController.js';

router.post('/recover', couponController.recoverCoupon);

export default router;
