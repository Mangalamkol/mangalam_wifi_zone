import Device from "../models/device.model.js";
import axios from "axios";

export async function forceDisconnect(req, res) {
  const { mac } = req.body;

  await axios.post(
    `${process.env.OC200_URL}/proxy/network/api/s/${process.env.OMADA_ID}/cmd/stamgr`,
    {
      cmd: "kick-sta",
      mac,
    },
    {
      auth: {
        username: process.env.OC200_USERNAME,
        password: process.env.OC200_PASSWORD,
      },
      httpsAgent: { rejectUnauthorized: false },
    }
  );

  await Device.updateOne({ mac }, { active: false });
  res.json({ success: true });
}
