const { sendWhatsAppMessage } = require('../utils');

exports.webhookHandler = (req, res) => {
  // Handle webhook verification for setup in Meta dashboard
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    console.log("WhatsApp webhook verification request received");
    return res.status(200).send(req.query["hub.challenge"]);
  }

  // For now, just acknowledge receipt of other webhooks
  res.json({ received: true });
};

exports.sendMessage = async (req, res) => {
  try {
    const { phone, message } = req.body;

    const reply = await sendWhatsAppMessage(phone, message);

    res.json(reply.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};