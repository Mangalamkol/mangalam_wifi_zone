import Device from "../models/device.model.js";

export async function getLiveDevices(req, res) {
  const devices = await Device.find({ active: true });
  res.json(devices);
}
