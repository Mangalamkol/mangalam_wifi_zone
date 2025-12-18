import axios from "axios";

const GRAPH_URL = "https://graph.facebook.com/v19.0";

export async function sendWhatsApp(to, text) {
  const url = `${GRAPH_URL}/${process.env.WHATSAPP_PHONE_ID}/messages`;
  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
    "Content-Type": "application/json",
  };

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: text },
  };

  await axios.post(url, payload, { headers });
}
