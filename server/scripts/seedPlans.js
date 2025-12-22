import dotenv from "dotenv";
dotenv.config({ path: 'server/.env' }); // <-- MUST be first

import mongoose from "mongoose";
import Plan from "../models/Plan.js";

const plans = [
  { planId: "1h_10", name: "1 Hour Unlimited", durationMinutes: 60, price: 10, maxDevices: 1 },
  { planId: "2h_20", name: "2 Hours Unlimited", durationMinutes: 120, price: 20, maxDevices: 1 },
  { planId: "5h_30", name: "5 Hours Unlimited", durationMinutes: 300, price: 30, maxDevices: 1 },
  { planId: "24h_50", name: "24 Hours Unlimited", durationMinutes: 1440, price: 50, maxDevices: 1 },
  { planId: "30d_100", name: "30 Days Unlimited", durationMinutes: 43200, price: 100, maxDevices: 1 },
  { planId: "30d_300_5d", name: "30 Days (5 Devices)", durationMinutes: 43200, price: 300, maxDevices: 5 },
];

await mongoose.connect(process.env.MONGODB_URI);

await Plan.deleteMany();
await Plan.insertMany(plans);

console.log("✅ Plans seeded successfully");
process.exit();