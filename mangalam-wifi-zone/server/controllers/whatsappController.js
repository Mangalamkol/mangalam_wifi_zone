// server/controllers/whatsappController.js
const asyncHandler = require('../utils/asyncHandler');
// Example placeholder: integrate your Twilio/WhatsApp client

exports.verifyWebhook = (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

exports.incomingWebhook = asyncHandler(async (req, res) => {
  // handle incoming message
  console.log('WhatsApp webhook', req.body);
  res.sendStatus(200);
});

exports.sendCouponToPhone = asyncHandler(async (req, res) => {
  const { phone, couponCode } = req.body;
  // send via your WhatsApp client here
  // e.g., whatsappClient.sendMessage(phone, `Your coupon: ${couponCode}`)
  res.json({ ok: true, to: phone });
});
