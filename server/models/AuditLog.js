const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  action: { type: String, required: true },
  targetType: { type: String }, // e.g. 'Coupon', 'Plan', 'Transaction'
  targetId: { type: mongoose.Schema.Types.ObjectId, default: null },
  meta: { type: mongoose.Schema.Types.Mixed },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);