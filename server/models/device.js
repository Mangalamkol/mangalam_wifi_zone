const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: { type: String, required: true, index: true }, // generated id OR MAC address
  lastSeenAt: { type: Date, default: Date.now },
  ip: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon' }, // current coupon assigned
  meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

deviceSchema.index({ deviceId: 1 });
deviceSchema.index({ lastSeenAt: 1 });

module.exports = mongoose.model('Device', deviceSchema);