import axios from "axios";

export async function sendAlert(msg) {
  if (!process.env.ALERT_WEBHOOK) return;
  await axios.post(process.env.ALERT_WEBHOOK, {
    text: `🚨 Mangalam WiFi Alert\n${msg}`,
  });
}