import Device from "../models/device.model.js";
import axios from "axios";

export async function expiryCheck() {
  const now = new Date();
  const expired = await Device.find({ expiresAt: { $lt: now }, active: true });

  if (expired.length > 0) {
    console.log(`Found ${expired.length} expired devices.`);
  }

  for (const d of expired) {
    console.log(`Deactivating device for MAC: ${d.mac}`);
    await axios.post(
      `${process.env.OC200_URL}/proxy/network/api/s/${process.env.OMADA_ID}/cmd/stamgr`,
      { cmd: "kick-sta", mac: d.mac },
      {
        auth: {
          username: process.env.OC200_USERNAME,
          password: process.env.OC200_PASSWORD,
        },
        httpsAgent: { rejectUnauthorized: false },
      }
    );

    d.active = false;
    await d.save();
  }
}
