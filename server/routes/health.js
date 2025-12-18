import express from 'express';
import KILL from '../config/killSwitch.js';

const router = express.Router();

// 🩺 HEALTH CHECK API
router.get("/", (req, res) => {
  res.json({
    status: KILL.SYSTEM_ENABLED ? "LIVE" : "DOWN",
    payment: KILL.PAYMENT_ENABLED ? "LIVE" : "DOWN",
    whatsapp: KILL.WHATSAPP_ENABLED ? "LIVE" : "DOWN",
    server_time: new Date().toISOString()
  });
});

export default router;
