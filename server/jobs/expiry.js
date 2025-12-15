const cron = require('node-cron');
const Coupon = require('../models/Coupon');

const pattern = process.env.AUTO_EXPIRY_CRON || '*/5 * * * *';

// mark expired coupons and free up or log
cron.schedule(pattern, async ()=>{
  console.log('Running coupon expiry job');
  const now = new Date();
  const res = await Coupon.updateMany({isExpired:false, expiresAt: {$lte: now}}, {$set:{isExpired:true}});
  console.log('Expired coupons updated:', res.modifiedCount);
});