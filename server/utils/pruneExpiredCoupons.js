const Coupon = require('../models/Coupon');
const mongoose = require('mongoose');

async function pruneExpiredCoupons() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const now = new Date();
    const result = await Coupon.deleteMany({ expiresAt: { $lt: now } });

    console.log(`Successfully pruned ${result.deletedCount} expired coupons.`);
  } catch (error) {
    console.error('Error pruning expired coupons:', error);
  } finally {
    await mongoose.disconnect();
  }
}

pruneExpiredCoupons();
