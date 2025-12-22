/**
 * PROJECT INSPECTOR
 * Shows:
 * - What exists
 * - What is missing
 * - What is forbidden
 */

import fs from "fs";

const REQUIRED = [
  "server/models/user.model.js",
  "server/models/plan.model.js",
  "server/models/transaction.model.js",
  "server/models/coupon.model.js",
  "server/services/paymentVerify.js",
  "server/services/couponGenerator.js",
  "server/routes/payment.routes.js",
];

console.log("\n📦 PROJECT INSPECTION REPORT\n");

let ok = 0;

for (const file of REQUIRED) {
  if (fs.existsSync(file)) {
    console.log("✅", file);
    ok++;
  } else {
    console.log("❌ MISSING:", file);
  }
}

console.log(`\nSTATUS: ${ok}/${REQUIRED.length} core files ready`);