export async function sendSMS(phone, message) {
  // plug any provider: Twilio / MSG91 / Fast2SMS
  console.log("SMS sent to", phone, message);
}
