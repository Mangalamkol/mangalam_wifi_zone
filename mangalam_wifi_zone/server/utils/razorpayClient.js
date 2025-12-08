const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay client with standardized environment variables.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Creates a new Razorpay order.
 * @param {number} amount - The order amount in the base currency (e.g., INR).
 * @param {string} receipt - A unique receipt ID for the order.
 * @returns {Promise<object>} The created order object.
 */
async function createOrder(amount, receipt) {
  try {
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects the amount in the smallest currency unit (paise).
      currency: "INR",
      receipt,
    };
    return await razorpay.orders.create(options);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order.");
  }
}

/**
 * Verifies the payment signature returned by Razorpay on the client-side.
 * @param {string} orderId - The ID of the order.
 * @param {string} paymentId - The ID of the payment.
 * @param {string} signature - The signature to verify.
 * @returns {boolean} True if the signature is valid, false otherwise.
 */
function verifyPaymentSignature(orderId, paymentId, signature) {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}

/**
 * Verifies the webhook signature sent by Razorpay.
 * @param {string} body - The raw request body (as a string).
 * @param {string} signature - The value of the 'x-razorpay-signature' header.
 * @returns {boolean} True if the signature is valid, false otherwise.
 */
function verifyWebhookSignature(body, signature) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    console.error("RAZORPAY_WEBHOOK_SECRET is not set.");
    return false;
  }
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(body))
    .digest("hex");

  return expectedSignature === signature;
}

module.exports = {
  createOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
};
