const Coupon = require("../models/Coupon");

module.exports = async function generateCoupons(planId, count) {
  const coupons = [];

  for (let i = 0; i < count; i++) {
    const code = "MZ" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const c = await Coupon.create({
      code,
      plan: planId,
      devicesUsed: []
    });

    coupons.push(c);
  }

  return coupons;
};