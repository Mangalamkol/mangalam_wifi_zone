import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  used: { type: Boolean, default: false },
  maxDevices: { type: Number, default: 1 },
  usedDevices: { type: Number, default: 0 },
  expiresAt: { type: Date },
  assignedAt: { type: Date },
  status: { type: String, enum: ['active', 'expired'], default: 'active' },
  source: { type: String },
}, { timestamps: true });

export default mongoose.model('Coupon', CouponSchema);
