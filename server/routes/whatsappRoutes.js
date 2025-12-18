import express from "express";
const router = express.Router();
import { sendWhatsApp } from "../services/whatsappService.js";
import Coupon from "../models/Coupon.js";
import whatsappController from '../controllers/whatsappController.js';
import { auth } from '../middleware/authMiddleware.js';
import { whatsappGuard } from "../middleware/adminFeatureGuard.js";

// Verification (Meta)
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Incoming Messages
router.post("/", async (req, res) => {
  try {
    const msg =
      req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    const from = msg.from; // user phone
    const text = msg.text?.body?.trim();

    // Help / Recovery by Transaction ID
    if (text?.toUpperCase().startsWith("TXN")) {
      const coupon = await Coupon.findOne({ transactionId: text });
      if (!coupon) {
        await sendWhatsApp(from, "❌ Transaction ID পাওয়া যায়নি।");
      } else {
        await sendWhatsApp(
          from,
          `✅ আপনার কুপন:\n${coupon.code}\n⏰ Expiry: ${new Date(
            coupon.expiresAt
          ).toLocaleString()}`
        );
      }
    } else {
      await sendWhatsApp(
        from,
        "ℹ️ কুপন পেতে আপনার Transaction ID পাঠান (উদাহরণ: TXN123...)"
      );
    }

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(200);
  }
});

router.post("/send", whatsappGuard, async (req, res) => {
  const { to, text } = req.body;

  if (!to || !text) {
    return res.status(400).json({ error: "Missing 'to' or 'text' in the request body." });
  }

  try {
    await sendWhatsApp(to, text);
    res.status(200).json({ success: true, message: "Message sent." });
  } catch (error) {
    console.error("Failed to send WhatsApp message:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// send coupon via whatsapp after purchase (server triggered)
router.post('/send-coupon', auth, whatsappController.sendCouponToPhone);

router.post('/send-otp', auth, whatsappController.sendOtp);

export default router;
