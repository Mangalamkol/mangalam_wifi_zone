import express from "express";
import { generateCoupons } from "../utils/couponGenerator.js";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const { prefix, planId, count } = req.body;
    if (!prefix || !planId || !count) {
      return res.status(400).json({ message: "Missing required fields: prefix, planId, count" });
    }

    const coupons = await generateCoupons(prefix, planId, count);
    res.status(201).json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
