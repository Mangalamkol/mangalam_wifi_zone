const Razorpay = require("razorpay");

// Initialize and export the Razorpay client instance
module.exports = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       // Corrected from RAZORPAY_KEY
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Corrected from RAZORPAY_SECRET
});
