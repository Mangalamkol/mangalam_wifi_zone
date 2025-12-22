import Session from "../models/session.model.js";
import { ocAuthorize } from "../services/oc200.service.js";

export async function createSession(req, res) {
  const { mac, plan } = req.body;

  if (!mac || !plan || !plan.duration || !plan.id) {
    return res.status(400).json({ message: "Missing required fields: mac and plan with duration and id." });
  }

  try {
    const start = new Date();
    // The plan duration is in minutes, but the session expiration is in milliseconds
    const expire = new Date(start.getTime() + plan.duration * 60 * 1000);

    await ocAuthorize(mac, plan.duration);

    await Session.create({
      mac,
      planId: plan.id,
      startAt: start,
      expireAt: expire,
      active: true
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Failed to create session:", error);
    res.status(500).json({ message: "Failed to create session.", error: error.message });
  }
}
