// server/controllers/razorpayController.js
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Transaction = require('../models/Transaction');
const Coupon = require('../models/Coupon');

const rz = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;
    const order = await rz.orders.create({ amount: Math.round(amount), currency, receipt });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  // optional server-side verification after payment
  const { order_id, payment_id, signature } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
  hmac.update(order_id + '|' + payment_id);
  const digest = hmac.digest('hex');
  if (digest !== signature) return res.status(400).json({ ok: false });

  // mark transaction as paid, deliver coupon etc.
  // create Transaction record
  await Transaction.create({ order_id, payment_id, status: 'paid' });
  res.json({ ok: true });
};

exports.refundPayment = async (req, res) => {
    // Placeholder for refund logic
    try {
        const { payment_id, amount } = req.body;
        // const refund = await rz.payments.refund(payment_id, { amount });
        // res.json(refund);
        res.json({ message: 'Refund placeholder' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.webhookHandler = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.body.toString());
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      return res.status(400).json({ ok: false, message: 'Invalid signature' });
    }

    const payload = JSON.parse(req.body.toString());
    // handle payment.paid and others
    if (payload.event === 'payment.captured' || payload.event === 'payment.authorized') {
      const payment = payload.payload.payment.entity;
      // save transaction
      await Transaction.create({
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        amount: payment.amount,
        status: payment.status,
        raw: payment,
      });

      // TODO: choose and mark coupon(s), send via WhatsApp/SMS, and respond
    }

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
