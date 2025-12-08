const Coupon = require('../models/Coupon');
const { parseCouponPDF } = require('../utils');

exports.uploadPdfAndImport = async (req, res) => {
  try {
    const { planId } = req.body;

    const codes = await parseCouponPDF(req.file.path);
    const coupons = codes.map(code => ({
      code,
      plan: planId,
      used: false
    }));

    await Coupon.insertMany(coupons);

    res.json({ imported: coupons.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.listCoupons = async (req, res) => {
  const list = await Coupon.find();
  res.json(list);
};

exports.redeemCoupon = async (req, res) => {
  try {
    const { code, deviceId } = req.body;

    const coupon = await Coupon.findOne({ code });

    if (!coupon) return res.status(404).json({ message: "Invalid code" });
    if (coupon.used) return res.status(400).json({ message: "Already used" });

    coupon.used = true;
    coupon.deviceId = deviceId;
    coupon.usedAt = new Date();
    await coupon.save();

    res.json({ message: "Redeemed successfully", coupon });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.couponStatus = async (req, res) => {
  const coupon = await Coupon.findOne({ code: req.params.code });
  if (!coupon) return res.json({ valid: false });

  res.json({ valid: true, coupon });
};

exports.deleteCoupon = async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};