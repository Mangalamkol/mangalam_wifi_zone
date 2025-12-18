import mongoose from 'mongoose';

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },          // INR
  durationMinutes: { type: Number, required: true },// 60, 120, 1440, etc.
  active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Plan', PlanSchema);