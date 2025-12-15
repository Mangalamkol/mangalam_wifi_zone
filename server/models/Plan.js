const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  durationHours: Number,
  deviceLimit: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Plan", PlanSchema);