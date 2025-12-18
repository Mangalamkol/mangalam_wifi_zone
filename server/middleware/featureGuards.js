import KILL from "../config/killSwitch.js";

export const paymentGuard = (req, res, next) => {
  if (!KILL.PAYMENT_ENABLED) {
    return res.status(503).json({ error: "PAYMENT DISABLED" });
  }
  next();
};

export const whatsappGuard = (req, res, next) => {
  if (!KILL.WHATSAPP_ENABLED) {
    return res.status(503).json({ error: "WHATSAPP DISABLED" });
  }
  next();
};