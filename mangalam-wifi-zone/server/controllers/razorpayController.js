const razorpay = require("../utils/razorpayClient");
const crypto = require("crypto");
const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const { createVoucherOnOC200 } = require("../utils/oc200Client");

exports.createOrder = async (req, res) => {
  const { amount, planKey, deviceId } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_order_${new Date().getTime()}`,
      notes: { planKey, deviceId },
    };

    const order = await razorpay.orders.create(options);
    res.json({ ok: true, order });
  } catch (error) {
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    order_id,
    payment_id,
    signature,
    planKey,
    deviceId,
  } = req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  if (generatedSignature !== signature) {
    return res.status(400).json({ error: "Invalid signature" });
  }

  const coupon = await Coupon.findOneAndUpdate(
    { status: "available", planKey },
    { status: "used", usedBy: [{ deviceId, usedAt: new Date() }] }
  );

  if (!coupon) {
    return res.status(404).json({ error: "No available coupons for this plan" });
  }

  // Assuming createVoucherOnOC200 is implemented elsewhere
  // await createVoucherOnOC200(coupon.code, 60); // Example duration

  await Order.create({
    orderId: order_id,
    paymentId: payment_id,
    signature,
    planKey,
    deviceId,
    couponCode: coupon.code,
    status: "paid",
  });

  res.json({ ok: true, couponCode: coupon.code });
};
