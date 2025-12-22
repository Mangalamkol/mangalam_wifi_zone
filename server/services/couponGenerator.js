/**
 * =========================================================
 * FILE: couponGenerator.js
 * STATUS: REFACTORED - SECURE & ROBUST
 * =========================================================
 *
 * PURPOSE:
 *  - Generate coupon ONLY after a verified payment transaction.
 *
 * STRICT RULES:
 *  - Called ONLY after payment verification.
 *  - One coupon per transaction (idempotent).
 *  - Secure, unpredictable coupon codes.
 *  - Expiry based on plan duration.
 *
 * =========================================================
 */

import crypto from "crypto";
import Coupon from "../models/coupon.model.js";
import Plan from "../models/plan.model.js";
import Transaction from "../models/transaction.model.js";

/**
 * Generate cryptographically safe coupon code.
 */
function generateCouponCode() {
  return "MWZ-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

/**
 * Calculate expiry based on plan duration.
 */
function calculateExpiry(duration) {
  const now = new Date();

  switch (duration) {
    case "1h":
      now.setHours(now.getHours() + 1);
      break;
    case "2h":
      now.setHours(now.getHours() + 2);
      break;
    case "5h":
      now.setHours(now.getHours() + 5);
      break;
    case "1d":
      now.setDate(now.getDate() + 1);
      break;
    case "30d":
      now.setDate(now.getDate() + 30);
      break;
    default:
      // Fallback for numeric values in minutes
      if (typeof duration === 'number' && !isNaN(duration)) {
        now.setMinutes(now.getMinutes() + duration);
        break;
      }
      throw new Error(`INVALID_PLAN_DURATION: ${duration}`);
  }

  return now;
}

/**
 * =========================================================
 * MAIN ENTRY POINT
 * Generates a new coupon after a successful payment.
 * Ensures that a transaction is valid and that no coupon
 * has already been issued for it.
 * =========================================================
 */
export async function generateCoupon({ planId, transactionId }) {
  /**
   * 1️⃣ Idempotency check
   *    (Prevents duplicate coupons)
   */
  const existingCoupon = await Coupon.findOne({ transactionId });
  if (existingCoupon) {
    return existingCoupon;
  }

  /**
   * 2️⃣ Validate transaction
   *    Ensures payment was marked as successful.
   */
  const txn = await Transaction.findById(transactionId);
  if (!txn || txn.status !== "SUCCESS") {
    throw new Error("PAYMENT_NOT_VERIFIED");
  }

  /**
   * 3️⃣ Load plan
   */
  const plan = await Plan.findById(planId);
  if (!plan) {
    throw new Error("PLAN_NOT_FOUND");
  }

  /**
   * 4️⃣ Generate coupon details
   */
  const code = generateCouponCode();
  const expiresAt = calculateExpiry(plan.duration);

  /**
   * 5️⃣ Save coupon (atomic)
   */
  const newCoupon = await Coupon.create({
    code,
    planId,
    transactionId,
    expiresAt,
    maxDevices: plan.deviceLimit || 1,
    used: false,
    status: 'active',
    source: 'payment_gateway',
  });

  return newCoupon;
}