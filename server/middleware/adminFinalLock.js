import { ADMIN_LOCK } from "../config/adminLock.js";

export default function adminFinalLock(req, res, next) {
  if (!ADMIN_LOCK.LIVE_MODE) return next();

  if (
    req.method !== "GET" &&
    !ADMIN_LOCK.ALLOW_CONFIG_CHANGE
  ) {
    return res.status(403).json({
      error: "ADMIN PANEL LOCKED (LIVE MODE)"
    });
  }

  next();
}