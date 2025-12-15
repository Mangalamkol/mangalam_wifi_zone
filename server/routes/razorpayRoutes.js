const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.post("/verify", (req, res) => {
  const { order_id, payment_id, signature } = req.body;

  const body = order_id + "|" + payment_id;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body)
    .digest("hex");

  if (expected === signature) {
    return res.json({ ok: true });
  }
  return res.status(400).json({ ok: false });
});

module.exports = router;
