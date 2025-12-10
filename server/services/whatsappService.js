const axios = require('axios');

const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const whatsappService = axios.create({
  baseURL: `https://graph.facebook.com/v15.0/${WHATSAPP_PHONE_NUMBER_ID}`,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

const sendTextMessage = async (to, text) => {
  try {
    await whatsappService.post('/messages', {
      messaging_product: 'whatsapp',
      to,
      text: { body: text },
    });
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    // Re-throw the error to be handled by the caller
    throw error;
  }
};

module.exports = { sendTextMessage };
