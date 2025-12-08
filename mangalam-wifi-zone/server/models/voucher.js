const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  isActivated: { type: Boolean, default: false },
  activatedAt: { type: Date },
  expiresAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Voucher', voucherSchema);