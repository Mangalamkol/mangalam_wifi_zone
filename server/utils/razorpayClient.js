const Razorpay = require('razorpay');

let client = null;

const getClient = () => {
  if (!client) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay key_id and key_secret are required. Make sure they are in your .env file.');
    }
    client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return client;
};

const createOrder = (amount, currency = 'INR') => {
  const options = {
    amount: amount * 100, // Amount in the smallest currency unit
    currency,
  };
  return getClient().orders.create(options);
};

const verifyPaymentSignature = (order_id, payment_id, signature) => {
  const generated_signature = require('crypto')
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  return generated_signature === signature;
};

const refundPayment = (paymentId, amount) => {
  // If amount is provided, it's a partial refund. Amount should be in the smallest currency unit.
  const refundOptions = amount ? { amount: amount * 100, speed: 'normal' } : { speed: 'normal' };
  return getClient().payments.refund(paymentId, refundOptions);
};

module.exports = { getClient, createOrder, verifyPaymentSignature, refundPayment };
