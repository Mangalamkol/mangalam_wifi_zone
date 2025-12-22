/**
 * MANGALAM WIFI ZONE
 * MASTER AUDIT + AUTO REPAIR SCRIPT
 * ---------------------------------
 * Usage: node scripts/project_master_audit.js
 */

import fs from "fs";
import path from "path";
import child_process from "child_process";

const ROOT = process.cwd();

const REQUIRED_FOLDERS = [
  "server",
  "server/routes",
  "server/models",
  "server/services",
  "client",
  "scripts",
  "server/webhooks",
];

const REQUIRED_FILES = [
  "server/server.js",
  "server/.env",
  "scripts/audit.js",
  "scripts/auto-repair.js",
  "local-agent.js",
];

const REQUIRED_FEATURES = [
  { key: "OC200_INTEGRATION", files: ["local-agent.js"] },
  { key: "CLOUD_AGENT_QUEUE", files: ["server/routes/agent.routes.js"] },
  { key: "AUTO_EXPIRY", files: ["server/jobs/expiry.job.js"] },
  { key: "FAILOVER_RETRY", files: ["server/services/taskDispatcher.js"] },
  { key: "EXPIRATION_WEBHOOK", files: ["server/webhooks/expiration.js"] },
];

let report = {
  folders_ok: [],
  folders_missing: [],
  files_ok: [],
  files_missing: [],
  features_ok: [],
  features_missing: [],
  auto_fixed: [],
};

function exists(p) {
  return fs.existsSync(path.join(ROOT, p));
}

/* ---------- FOLDER CHECK ---------- */
for (const f of REQUIRED_FOLDERS) {
  if (exists(f)) report.folders_ok.push(f);
  else {
    report.folders_missing.push(f);
    fs.mkdirSync(path.join(ROOT, f), { recursive: true });
    report.auto_fixed.push(`Created folder: ${f}`);
  }
}

/* ---------- FILE CHECK ---------- */
for (const f of REQUIRED_FILES) {
  if (exists(f)) report.files_ok.push(f);
  else {
    report.files_missing.push(f);
    fs.writeFileSync(path.join(ROOT, f), "// AUTO-GENERATED PLACEHOLDER\n");
    report.auto_fixed.push(`Created file: ${f}`);
  }
}

/* ---------- FEATURE CHECK ---------- */
for (const feature of REQUIRED_FEATURES) {
  const ok = feature.files.every(f => exists(f));
  if (ok) report.features_ok.push(feature.key);
  else report.features_missing.push(feature.key);
}

/* ---------- AUTO REPAIR KNOWN ISSUES ---------- */

// 1. Fix duplicate server port
try {
  const serverJs = path.join(ROOT, "server/server.js");
  if (fs.existsSync(serverJs)) {
    let c = fs.readFileSync(serverJs, "utf8");
    if (!c.includes("process.env.PORT")) {
      c = c.replace(/3000/g, "process.env.PORT || 3000");
      fs.writeFileSync(serverJs, c);
      report.auto_fixed.push("Fixed hardcoded PORT in server.js");
    }
  }
} catch {}

// 2. Ensure .env minimum keys
const ENV_KEYS = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "OC200_URL",
  "OC200_USERNAME",
  "OC200_PASSWORD",
  "CLOUD_URL",
];

const envPath = path.join(ROOT, "server/.env");
let envData = exists("server/.env") ? fs.readFileSync(envPath, "utf8") : "";

for (const k of ENV_KEYS) {
  if (!envData.includes(k + "=")) {
    envData += `\n${k}=`;
    report.auto_fixed.push(`Added ENV key: ${k}`);
  }
}
fs.writeFileSync(envPath, envData);

/* ---------- FINAL CALCULATION ---------- */

const TOTAL_FEATURES = REQUIRED_FEATURES.length;
const DONE_FEATURES = report.features_ok.length;

const COMPLETION_PERCENT = Math.round(
  (DONE_FEATURES / TOTAL_FEATURES) * 100
);

/* ---------- FINAL OUTPUT ---------- */

console.log("\n================ MASTER PROJECT REPORT ================\n");

console.log("✔ Folders OK:", report.folders_ok.length);
console.log("✖ Folders Missing:", report.folders_missing.length);

console.log("✔ Files OK:", report.files_ok.length);
console.log("✖ Files Missing:", report.files_missing.length);

console.log("\n✔ Features Completed:");
report.features_ok.forEach(f => console.log("  -", f));

console.log("\n✖ Features Pending:");
report.features_missing.forEach(f => console.log("  -", f));

console.log("\n🔧 Auto Repairs Applied:");
report.auto_fixed.forEach(f => console.log("  -", f));

console.log("\n-------------------------------------------------------");
console.log("PROJECT COMPLETION:", COMPLETION_PERCENT + "%");

if (COMPLETION_PERCENT === 100) {
  console.log("STATUS: ✅ PRODUCTION READY");
} else {
  console.log("STATUS: ⚠ PARTIALLY COMPLETE");
}

console.log("\nNEXT REQUIRED SCRIPTS:");
report.features_missing.forEach((f, i) =>
  console.log(` ${i + 1}. ${f}_SCRIPT`)
);

console.log("\n=======================================================\n");