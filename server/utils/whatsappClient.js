const axios = require('axios');

const { WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID } = process.env;

const whatsappClient = axios.create({
  baseURL: `https://graph.facebook.com/v18.0/${WHATSAPP_PHONE_NUMBER_ID}`,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a text message to a given phone number.
 * @param {string} to - The recipient's phone number (with country code).
 * @param {string} text - The message to send.
 * @returns {Promise<object>} - The response from the WhatsApp API.
 */
const sendText = async (to, text) => {
  try {
    const response = await whatsappClient.post('/messages', {
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body: text },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Error sending WhatsApp message:',
      error.response ? error.response.data : error.message
    );
    throw new Error('Failed to send WhatsApp message');
  }
};

module.exports = {
  sendText,
};
