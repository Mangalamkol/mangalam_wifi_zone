import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  mac: { type: String, unique: true },
  ip: String,
  planId: String,
  connectedAt: Date,
  expiresAt: Date,
  active: Boolean,
});

export default mongoose.model("Device", DeviceSchema);
