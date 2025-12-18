import express from 'express';
const router = express.Router();
import Plan from '../models/plan.js';
import Coupon from '../models/coupon.js';
import { razorpay } from '../utils/razorpay.js';
import razorpayGuard from "../middleware/razorpayGuard.js";
import { paymentGuard } from "../middleware/featureGuards.js";

// Create a Razorpay order
router.post('/order', paymentGuard, razorpayGuard, async (req, res) => {
  const { planId, couponCode } = req.body;
  try {
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    let amount = plan.price;
    let discount = 0;

    // Optional: apply coupon
    if (couponCode) {
      // TODO: coupon logic
    }

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paisa
      currency: 'INR',
      receipt: `receipt_plan_${plan._id}`,
    });

    res.json({ orderId: order.id, amount: order.amount });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify payment and generate voucher
router.post('/verify', async (req, res) => {
  const { orderId, paymentId, signature, planId } = req.body;

  // TODO: verify signature
  // TODO: create voucher and save transaction

  res.json({ message: 'Payment verified (TODO)' });
});

export default router;
