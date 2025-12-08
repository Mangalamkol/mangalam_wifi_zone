const crypto = require('crypto');

// Middleware to verify the signature of incoming Razorpay webhooks
exports.verifyRazorWebhook = (req, res, next) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'];

  try {
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest !== signature) {
      console.error('Invalid Razorpay webhook signature');
      return res.status(400).json({ status: 'Invalid signature' });
    }

    // If the signature is valid, proceed to the next middleware (the webhook handler)
    next();
  } catch (error) {
    console.error('Error verifying Razorpay webhook:', error);
    res.status(500).json({ error: error.message });
  }
};
