const cron = require("node-cron");
const { Coupon } = require("../models");

cron.schedule("*/10 * * * *", async () => {
  const now = Date.now();
  await Coupon.updateMany(
    { expiresAt: { $lt: now }, active: true },
    { active: false }
  );
  console.log("Expired coupons disabled");
});

module.exports = {};