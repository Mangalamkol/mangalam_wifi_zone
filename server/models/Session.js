const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon', required: true },
  clientId: { type: String, required: true }, // identifier of device / client (MAC, device id, token)
  ip: { type: String },
  connectedAt: { type: Date, default: Date.now },
  disconnectedAt: { type: Date },
  expiresAt: { type: Date }, // when access should end
  bytesIn: { type: Number, default: 0 },
  bytesOut: { type: Number, default: 0 },
  terminatedBy: { type: String } // admin / OC200 / auto
});

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // optional TTL if you want auto cleanup

module.exports = mongoose.model('Session', SessionSchema);