const axios = require("axios");

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.WHATSAPP_PHONE_ID;

exports.sendText = async (to, message) => {
  try {
    const resp = await axios.post(
      `https://graph.facebook.com/v19.0/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return resp.data;
  } catch (err) {
    console.error(
      "WhatsApp send error:",
      err.response ? err.response.data : err.message
    );
    return null;
  }
};
