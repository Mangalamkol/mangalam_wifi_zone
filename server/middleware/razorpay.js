const crypto = require('crypto');

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

const verifyRazorpayWebhook = (req, res, next) => {
  const signature = req.headers['x-razorpay-signature'];

  if (!signature) {
    return res.status(400).json({ message: 'Webhook signature is missing.' });
  }

  try {
    const hmac = crypto.createHmac('sha256', RAZORPAY_WEBHOOK_SECRET);
    // req.body is the raw buffer here
    hmac.update(req.body);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === signature) {
      // Parse the JSON body *after* verification and attach it to the request
      req.body = JSON.parse(req.body.toString());
      next();
    } else {
      res.status(403).json({ message: 'Invalid webhook signature.' });
    }
  } catch (error) {
    console.error('Error verifying Razorpay webhook:', error);
    res.status(500).json({ message: 'Internal server error during webhook verification.' });
  }
};

module.exports = { verifyRazorpayWebhook };
