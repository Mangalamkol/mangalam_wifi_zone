import express from "express";
import Plan from "../models/Plan.js";

const router = express.Router();

router.post("/", async (req, res) => {
  await Plan.insertMany(req.body);
  res.json({ success: true });
});

export default router;