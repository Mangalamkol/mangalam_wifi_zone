const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  type: String,
  message: String,
  data: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", LogSchema);