const whatsappClient = require("../utils/whatsappClient");
const Coupon = require("../models/Coupon");

const WHATSAPP_VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;

exports.sendMessage = async (req, res) => {
  const { to, message } = req.body;
  try {
    const resp = await whatsappClient.sendText(to, message);
    res.json({ ok: true, resp });
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.webhookHandler = async (req, res) => {
  // Handle webhook verification for setup in Meta dashboard
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === WHATSAPP_VERIFY_TOKEN
  ) {
    console.log("WhatsApp webhook verification request received");
    return res.status(200).send(req.query["hub.challenge"]);
  }

  // Handle incoming messages
  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message && message.type === "text") {
    const from = message.from; // This is the customer's phone number
    const text = message.text.body.toLowerCase().trim();

    if (text === "coupon") {
      const coupon = await Coupon.findOneAndUpdate(
        { status: "available" },
        {
          status: "used",
          usedBy: [{ deviceId: `whatsapp:${from}`, usedAt: new Date() }],
        }
      );

      if (coupon) {
        await whatsappClient.sendText(
          from,
          `Your Wi-Fi coupon is: ${coupon.code}`
        );
      } else {
        await whatsappClient.sendText(
          from,
          "Sorry, no available coupons at the moment."
        );
      }
    } else {
      await whatsappClient.sendText(
        from,
        'Send "coupon" to get a Wi-Fi coupon.'
      );
    }
  }

  res.sendStatus(200);
};
