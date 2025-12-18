import asyncHandler from '../utils/asyncHandler.js';
import { sendWhatsApp, sendWhatsAppTemplate } from '../services/whatsappService.js';

const whatsappController = {
  verifyWebhook: (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Check if a token and mode is in the query string of the request
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
        // Respond with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  },

  incomingWebhook: asyncHandler(async (req, res) => {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (message && message.type === 'text') {
      const from = message.from;
      const text = message.text.body.toLowerCase().trim();

      if (text === 'help') {
        await sendWhatsApp(
          from,
          'Please select language:\n1️⃣ English\n2️⃣ বাংলা\n3️⃣ हिन्दी\nReply with 1 / 2 / 3'
        );
      } else if (['1', '2', '3'].includes(text)) {
        const languageCode = {
          '1': 'en',
          '2': 'bn',
          '3': 'hi'
        }[text];

        await sendWhatsAppTemplate({
          phone: from,
          templateName: 'help_transaction_request_v1',
          languageCode: languageCode,
          variables: []
        });
      }
    }

    res.sendStatus(200);
  }),

  sendCouponToPhone: asyncHandler(async (req, res) => {
    const { phone, couponCode, validity, languageCode = 'bn' } = req.body;
    await sendWhatsAppTemplate({
      phone,
      templateName: 'coupon_delivery_v1',
      languageCode,
      variables: [couponCode, validity],
    });
    res.json({ ok: true, to: phone });
  }),

  sendOtp: asyncHandler(async (req, res) => {
    const { phone, otp, languageCode = 'bn' } = req.body;
    await sendWhatsAppTemplate({
      phone,
      templateName: 'otp_delivery_v1',
      languageCode,
      variables: [otp],
    });
    res.json({ ok: true, to: phone });
  })
};

export default whatsappController;
