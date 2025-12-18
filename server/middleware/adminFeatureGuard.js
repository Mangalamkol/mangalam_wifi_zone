const ADMIN = require("../config/adminLiveConfig");

exports.systemGuard = (req, res, next) => {
  if (!ADMIN.SYSTEM) {
    return res.status(503).json({ error: "SYSTEM OFF BY ADMIN" });
  }
  next();
};

exports.paymentGuard = (req, res, next) => {
  if (!ADMIN.PAYMENT) {
    return res.status(503).json({ error: "PAYMENT OFF BY ADMIN" });
  }
  next();
};

exports.whatsappGuard = (req, res, next) => {
  if (!ADMIN.WHATSAPP) {
    return res.status(503).json({ error: "WHATSAPP OFF BY ADMIN" });
  }
  next();
};