import axios from 'axios';

const ALLOWED_TEMPLATES = [
  "otp_delivery_v1",
  "coupon_delivery_v1",
  "help_transaction_request_v1"
];

export async function sendWhatsAppTemplate({ phone, templateName, languageCode, variables }) {
  if (!ALLOWED_TEMPLATES.includes(templateName)) {
    const error = new Error("Template not approved for LIVE use");
    error.statusCode = 403;
    throw error;
  }

  try {
    const component = variables && variables.length > 0 ? [{
      type: 'body',
      parameters: variables.map(value => ({ type: 'text', text: value.toString() }))
    }] : [];

    const response = await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v15.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: phone,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: languageCode
          },
          components: component
        }
      }
    });

    console.log('WhatsApp template message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp template message:', error.response ? error.response.data : error.message);
    throw error;
  }
}
