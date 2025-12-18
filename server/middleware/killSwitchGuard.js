import KILL from "../config/killSwitch.js";

// 🔒 GLOBAL SYSTEM GUARD
export default (req, res, next) => {
  if (!KILL.SYSTEM_ENABLED) {
    return res.status(503).json({
      error: "SYSTEM TEMPORARILY DISABLED"
    });
  }
  next();
};