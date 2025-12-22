/**
 * AUTO REPAIR SCRIPT
 * Fixes:
 * - dotenv load order
 * - db.js export mismatch
 * - index.js bootstrap failure
 */

import fs from "fs";

function fixDB() {
  const p = "server/utils/db.js";
  if (!fs.existsSync(p)) return;

  fs.writeFileSync(p, `
import mongoose from "mongoose";

export async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI missing");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("[DB] Connected");
}
`);
}

function fixIndex() {
  const p = "server/index.js";
  if (!fs.existsSync(p)) return;

  fs.writeFileSync(p, `
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./utils/db.js";

const app = express();
app.use(express.json());

await connectDB();

app.get("/health", (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 18000;
app.listen(PORT, () =>
  console.log("SERVER RUNNING ON PORT", PORT)
);
`);
}

fixDB();
fixIndex();

console.log("AUTO REPAIR COMPLETED");