import express from "express";
const router = express.Router();
import { notifyUser } from "../services/notificationService.js";
import Coupon from "../models/Coupon.js";
import Transaction from "../models/Transaction.js";

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
    const text = msg.text?.body?.trim().toUpperCase();

    if (text === 'HELP') {
      await notifyUser({
          phone: from,
          template: "coupon_help",
          params: [],
          smsText: "Please reply with your Transaction ID.",
          lang: 'en_US'
      });
    } else {
      // Assume the user is replying with a transaction ID
      const transaction = await Transaction.findOne({ 
        $or: [{ payment_id: text }, { razorpay_payment_id: text }]
      });
      
      if (!transaction) {
        await notifyUser({
            phone: from,
            template: "coupon_not_found",
            params: [],
            smsText: "Sorry, we could not find a coupon for the provided transaction ID.",
            lang: 'en_US'
        });
      } else {
        const coupon = await Coupon.findOne({ transactionId: transaction._id });
        if (!coupon) {
          await notifyUser({
              phone: from,
              template: "coupon_not_found",
              params: [],
              smsText: "Sorry, we could not find a coupon for the provided transaction ID.",
              lang: 'en_US'
          });
        } else {
          const expiry = new Date(coupon.expiresAt).toLocaleString();
          await notifyUser({
              phone: from,
              template: "coupon_recovery_txn",
              params: [coupon.code, expiry],
              smsText: `Recovered Coupon: ${coupon.code}`,
              lang: 'en_US'
          });
        }
      }
    }

    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(200);
  }
});

export default router;
