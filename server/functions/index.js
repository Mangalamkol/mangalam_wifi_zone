const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.midnightCheck = functions.pubsub
  .schedule('0 0 * * *')
  .timeZone('Asia/Kolkata')
  .onRun(async () => {
    // 1) expire coupons
    // 2) ping services
    // 3) write log
    console.log('Running midnight check');
    return null;
  });
