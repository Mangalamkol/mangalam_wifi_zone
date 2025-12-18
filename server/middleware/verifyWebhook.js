const crypto = require('crypto');
const logger = require('../utils/logger');
require('dotenv').config();

const verifyWebhook = (req, res, next) => {
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(req.body) // req.body is a Buffer from express.raw
    .digest('hex');

  if (expectedSignature !== req.headers['x-razorpay-signature']) {
    logger.warn('Invalid Razorpay webhook signature', {
      signature: req.headers['x-razorpay-signature'],
      ip: req.ip,
    });
    return res.status(400).send('Invalid signature');
  }

  // Verification passed, parse the body from buffer to JSON for the controller
  try {
      req.body = JSON.parse(req.body.toString());
  } catch (e) {
      logger.error('Failed to parse webhook JSON body', { error: e.message });
      return res.status(400).send('Invalid body format');
  }


  next();
};

module.exports = verifyWebhook;
