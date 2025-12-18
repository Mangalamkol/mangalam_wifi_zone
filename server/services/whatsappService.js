import axios from 'axios';

export async function sendWhatsAppTemplate({ phone, templateName, languageCode, variables }) {
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
