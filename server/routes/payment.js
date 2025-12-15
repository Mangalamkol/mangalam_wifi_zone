const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');
const Coupon = require('../models/coupon');
const { razorpay } = require('../utils/razorpay');

// Create a Razorpay order
router.post('/order', async (req, res) => {
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

module.exports = router;