import ADMIN from "../config/adminLiveConfig.js";

export const systemGuard = (req, res, next) => {
  if (!ADMIN.SYSTEM) {
    return res.status(503).json({ error: "SYSTEM OFF BY ADMIN" });
  }
  next();
};

export const paymentGuard = (req, res, next) => {
  if (!ADMIN.PAYMENT) {
    return res.status(503).json({ error: "PAYMENT OFF BY ADMIN" });
  }
  next();
};

export const whatsappGuard = (req, res, next) => {
  if (!ADMIN.WHATSAPP) {
    return res.status(503).json({ error: "WHATSAPP OFF BY ADMIN" });
  }
  next();
};
