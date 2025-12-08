const axios = require('axios');

async function sendWhatsApp(phone, message) {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!accessToken || !phoneNumberId) {
    throw new Error('WhatsApp access token or phone number ID is not configured.');
  }

  const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

  const data = {
    messaging_product: 'whatsapp',
    to: phone,
    type: 'text',
    text: {
      body: message,
    },
  };

  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error.response ? error.response.data : error.message);
    throw new Error('Failed to send WhatsApp message.');
  }
}

module.exports = sendWhatsApp;
