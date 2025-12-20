import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  id: String,
  name: String,
  duration: Number,
  price: Number,
  maxDevices: Number,
}, { timestamps: true });

const Plan = mongoose.model("Plan", planSchema);

export default Plan;