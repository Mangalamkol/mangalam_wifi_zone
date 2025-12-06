const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    planKey: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "used", "disabled"],
      default: "available",
    },
    usedBy: [
      {
        deviceId: String,
        usedAt: Date,
      },
    ],
    maxDevices: {
      type: Number,
      default: 1,
    },
    validTill: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Coupon", couponSchema);
