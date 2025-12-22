import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const passwordHash = await bcrypt.hash("admin123", 10);

await Admin.updateOne(
  { username: "admin" },
  { username: "admin", passwordHash },
  { upsert: true }
);

console.log("Admin seeded");
process.exit();