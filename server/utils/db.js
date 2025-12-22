import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("[DB] Connected");
}
