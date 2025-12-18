import { sendWhatsAppTemplate } from "./whatsappService.js";
import { sendSMS } from "./smsService.js";
import NotificationLog from "../models/NotificationLog.js";

export async function notifyUser({ phone, template, params, smsText, lang }) {
  try {
    // 1️⃣ Try WhatsApp first
    await sendWhatsAppTemplate(phone, template, params, lang);
    await NotificationLog.create({
      phone,
      template,
      channel: "whatsapp",
      status: "sent",
    });

    return {
      channel: "whatsapp",
      status: "sent",
    };
  } catch (err) {
    console.error("WhatsApp failed, fallback to SMS", err.message);

    // 2️⃣ Fallback to SMS
    try {
      await sendSMS(phone, smsText);
      await NotificationLog.create({
        phone,
        template,
        channel: "sms",
        status: "sent",
      });
      return {
        channel: "sms",
        status: "sent",
      };
    } catch (smsErr) {
      console.error("SMS also failed", smsErr.message);
      await NotificationLog.create({
        phone,
        template,
        channel: "sms",
        status: "failed",
      });

      // Re-throw the error to the caller if both channels fail
      throw smsErr;
    }
  }
}
