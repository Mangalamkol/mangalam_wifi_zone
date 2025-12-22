/**
 * PAYMENT VERIFICATION (FINAL)
 * - Signature verified
 * - Prevents replay
 * - Triggers coupon generation
 */

import crypto from "crypto";
import Transaction from "../models/transaction.model.js";
import { generateCoupon } from "./couponGenerator.js";

export async function verifyWebhook(req) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const body = JSON.stringify(req.body);

  const signature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (signature !== req.headers["x-razorpay-signature"]) {
    throw new Error("Invalid signature");
  }

  const paymentId = req.body.payload.payment.entity.id;

  const exists = await Transaction.findOne({ paymentId });
  if (exists) return; // replay blocked

  const txn = await Transaction.create({
    paymentId,
    status: "SUCCESS",
    raw: req.body
  });

  await generateCoupon({
    userId: txn.user,
    planId: txn.plan,
    transactionId: txn._id
  });
}