import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  action: String,
  payload: Object,
  createdAt: { type: Date, default: Date.now }
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

export default AuditLog;