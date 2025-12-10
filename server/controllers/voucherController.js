// server/controllers/voucherController.js
const Voucher = require('../models/Voucher');
const Coupon = require('../models/Coupon');
const Otp = require('../models/Otp'); // optional OTP model
const crypto = require('crypto');
const sendOtpSms = require('../lib/sendOtpSms'); // implement your SMS/WhatsApp

exports.redeemVoucher = async (req, res) => {
  try {
    const { code, deviceId } = req.body;
    const coupon = await Coupon.findOne({ code, status: 'available' });
    if (!coupon) return res.status(404).json({ message: 'Voucher not found or used' });

    // Mark used
    coupon.status = 'used';
    coupon.usedAt = new Date();
    coupon.usedByDevice = deviceId;
    await coupon.save();

    // create voucher record if you need sessions
    const v = await Voucher.create({
      code: coupon.code,
      plan: coupon.plan,
      deviceId,
      expiresAt: new Date(Date.now() + /* compute from plan */ 3600 * 1000)
    });

    res.json({ success: true, voucher: v });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVoucherByCode = async (req, res) => {
  const v = await Voucher.findOne({ code: req.params.code });
  if (!v) return res.status(404).json({ message: 'Not found' });
  res.json(v);
};

exports.requestOtp = async (req, res) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  // save OTP
  await Otp.create({ phone, code, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });
  // send OTP (WhatsApp/SMS)
  await sendOtpSms(phone, `Your OTP is ${code}`);
  res.json({ ok: true });
};

exports.verifyOtp = async (req, res) => {
  const { phone, code } = req.body;
  const record = await Otp.findOne({ phone, code });
  if (!record || record.expiresAt < Date.now()) return res.status(400).json({ message: 'Invalid OTP' });
  // respond allowing voucher fetch
  res.json({ ok: true });
};
