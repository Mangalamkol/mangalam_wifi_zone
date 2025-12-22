import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true }, // in minutes
  deviceLimit: { type: Number, default: 1}
});

export default mongoose.model("Plan", planSchema);
