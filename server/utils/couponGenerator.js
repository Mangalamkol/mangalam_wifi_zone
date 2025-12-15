const Coupon = require("../models/Coupon");

const generateCouponCode = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

module.exports = async (planId, count) => {
  const coupons = [];
  for (let i = 0; i < count; i++) {
    const code = generateCouponCode();
    const coupon = await Coupon.create({ planId, code });
    coupons.push(coupon);
  }
  return coupons;
};