const cron = require('node-cron');
const Coupon = require('../models/Coupon');
const Voucher = require('../models/Voucher');

cron.schedule('*/5 * * * *', async () => {
  try {
    const now = new Date();
    await Coupon.updateMany({ isUsed: false, expiresAt: { $lte: now } }, { isUsed: true });
    await Voucher.updateMany({ isUsed: false, expiresAt: { $lte: now } }, { isUsed: true });
    console.log('Cron: Expired coupons and vouchers updated');
  } catch (err) {
    console.error('Cron error', err);
  }
});