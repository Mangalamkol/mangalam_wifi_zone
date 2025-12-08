const { createOrder, verifyPaymentSignature, verifyWebhookSignature } = require("../utils/razorpayClient");
const Transaction = require("../models/Transaction");
const Coupon = require("../models/Coupon");
const Plan = require("../models/Plan");
const { sendWhatsAppMessage } = require("../utils/whatsappClient");

exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    const order = await createOrder(plan.price, plan.name);
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, planId } = req.body;

    if (!verifyPaymentSignature(orderId, paymentId, signature)) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    await Transaction.create({
      orderId,
      paymentId,
      signature,
      planId,
      status: "paid",
    });

    res.json({ message: "Payment verified" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.webhookHandler = async (req, res) => {
  if (!verifyWebhookSignature(req.rawBody, req.headers["x-razorpay-signature"])) {
    return res.status(400).json({ message: "Invalid webhook signature" });
  }

  const { event, payload } = req.body;

  if (event === "payment.captured") {
    const { order_id, id, amount, acquirer_data } = payload.payment.entity;
    const { receipt } = payload.payment.entity.notes;

    let couponCode = "N/A";
    let planName = receipt || "Unknown Plan";

    try {
      const plan = await Plan.findOne({ name: planName });

      if (plan) {
        const coupon = await Coupon.findOneAndUpdate(
          { plan: plan._id, used: false },
          { used: true, usedAt: new Date(), deviceId: acquirer_data.upi_transaction_id }
        );

        if (coupon) {
          couponCode = coupon.code;
          // Send WhatsApp message with the coupon code
          if (process.env.WHATSAPP_ENABLED === "true") {
            const userPhoneNumber = "+91" + acquirer_data.upi_transaction_id.split("@")[0]; // Example logic, might need adjustment
            const message = `Thank you for your purchase! Your Wi-Fi coupon code is: ${couponCode}`;
            try {
              await sendWhatsAppMessage(userPhoneNumber, message);
            } catch (whatsappError) {
              console.error("Failed to send WhatsApp message:", whatsappError);
            }
          }
        }
      }

      await Transaction.create({
        orderId: order_id,
        paymentId: id,
        amount: amount / 100,
        status: "captured",
        planName,
        couponCode,
        acquirerData: acquirer_data,
      });
    } catch (dbError) {
      console.error("Error processing webhook:", dbError);
    }
  }

  res.json({ received: true });
};
