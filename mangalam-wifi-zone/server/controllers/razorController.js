const Razorpay = require("razorpay");
const Transaction = require("../models/Transaction");
const crypto = require("crypto");

const razor = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", planKey } = req.body;

    const order = await razor.orders.create({
      amount: Math.round(amount * 100),
      currency,
      receipt: "order_" + Date.now(),
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];

    const body = JSON.stringify(req.body);
    const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");

    if (hash !== signature) {
      return res.status(400).json({ error: "Invalid signature" });
    }

    const payload = req.body.payload.payment.entity;

    await Transaction.create({
      razorpayOrderId: payload.order_id,
      razorpayPaymentId: payload.id,
      status: "captured",
      amount: payload.amount / 100,
      currency: payload.currency,
    });

    return res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
