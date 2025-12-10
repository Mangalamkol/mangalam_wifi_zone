const Coupon = require("../models/Coupon");

module.exports = async function disableExpired() {
  try {
    const now = new Date();

    // Find available coupons where the validTill date is in the past
    const updated = await Coupon.updateMany(
      { validTill: { $lte: now }, status: "available" },
      { $set: { status: "disabled" } }
    );

    if (updated.modifiedCount > 0) {
      console.log(`Expired coupons disabled: ${updated.modifiedCount}`);
    }

    return updated.modifiedCount;
  } catch (err) {
    console.error("disableExpired() ERROR:", err.message);
    return 0;
  }
};
