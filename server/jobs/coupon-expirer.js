import Coupon from "../models/Coupon.js";
import { ocLogout } from "../services/oc200.service.js";

setInterval(async () => {
  const expired = await Coupon.find({
    active: true,
    expiryTime: { $lt: new Date() }
  });

  for (const c of expired) {
    await ocLogout(c.macAddress);
    c.active = false;
    await c.save();
  }
}, 60 * 1000);
