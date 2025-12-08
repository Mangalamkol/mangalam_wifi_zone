const axios = require("axios");

// Create a dedicated axios instance for the WhatsApp API
const whatsappApi = axios.create({
  baseURL: `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_ID}`,
  headers: {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    "Content-Type": "application/json",
  },
});

async function sendWhatsAppMessage(to, message) {
  try {
    const response = await whatsappApi.post("/messages", {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: message },
    });
    return response.data;
  } catch (error) {
    // Log the detailed error from the API
    console.error(
      "Error sending WhatsApp message:",
      error.response ? error.response.data : error.message
    );
    // Re-throw a more specific error to be handled by the controller
    throw new Error("Failed to send WhatsApp message.");
  }
}

module.exports = { sendWhatsAppMessage };