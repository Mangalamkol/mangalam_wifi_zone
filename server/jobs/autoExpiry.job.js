import Task from "../models/task.model.js";
import Device from "../models/device.model.js";

export default async function autoExpiryJob() {
  const now = new Date();

  const expired = await Device.find({
    active: true,
    expiresAt: { $lte: now },
  });

  for (const d of expired) {
    await Task.create({
      type: "DEAUTHORIZE",
      mac: d.mac,
    });

    d.active = false;
    await d.save();
  }

  console.log(`[AUTO-EXPIRY] ${expired.length} session(s) queued`);
}
