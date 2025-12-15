const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
  action: String,
  adminUser: String,
  details: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ActivityLog", ActivityLogSchema);