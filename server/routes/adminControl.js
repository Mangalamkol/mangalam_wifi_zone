import express from "express";
import ADMIN from "../config/adminLiveConfig.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

// 🔧 STATUS
router.get("/status", adminAuth, (req, res) => {
  res.json(ADMIN);
});

// 🔧 UPDATE
router.post("/update", adminAuth, (req, res) => {
  const { SYSTEM, PAYMENT, WHATSAPP, COUPON } = req.body;

  if (SYSTEM !== undefined) ADMIN.SYSTEM = SYSTEM;
  if (PAYMENT !== undefined) ADMIN.PAYMENT = PAYMENT;
  if (WHATSAPP !== undefined) ADMIN.WHATSAPP = WHATSAPP;
  if (COUPON !== undefined) ADMIN.COUPON = COUPON;

  res.json({ success: true, ADMIN });
});

export default router;