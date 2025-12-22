import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
  mac: { type: String, unique: true },
  planId: String,
  expiresAt: Date,
  active: { type: Boolean, default: true },
});

export default mongoose.model("Device", DeviceSchema);
