import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Plan from "../models/plan.model.js";
import { startOC200Session } from "../services/oc200.service.js";

export async function createOrder(req, res) {
  try {
    const { planId } = req.body;
    if (!planId) {
      return res.status(400).send({ message: "planId is required" });
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).send({ message: "Plan not found" });
    }

    const amountInPaise = plan.price * 100;

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `receipt_plan_${planId}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function handlePaymentSuccess(req, res) {
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(req.rawBody);
  const digest = shasum.digest("hex");

  if (digest !== req.headers["x-razorpay-signature"]) {
    console.error("Invalid Razorpay webhook signature.");
    return res.status(400).send("Invalid signature");
  }

  if (req.body.event === "payment.captured") {
    try {
      const { mac, planId } = req.body.payload.payment.entity.notes;
      if (!mac || !planId) {
        console.error("Missing mac or planId in webhook payload notes.");
        return res.status(400).send("Missing mac or planId in notes");
      }
      console.log(`Processing payment for MAC: ${mac}, Plan ID: ${planId}`);
      await startOC200Session(mac, planId);
    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).json({ ok: false, message: "Internal server error" });
    }
  }

  res.json({ ok: true });
}
