import fs from "fs";

const REQUIRED = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "CLOUD_URL",
  "ALERT_WEBHOOK",
  "AGENT_ID"
];

let env = {};
if (fs.existsSync(".env")) {
  fs.readFileSync(".env", "utf8")
    .split("\n")
    .forEach(l => {
      const [k, v] = l.split("=");
      if (k) env[k] = v;
    });
}

let missing = REQUIRED.filter(k => !env[k]);

if (missing.length) {
  console.log("⚠ Missing ENV detected:", missing);
  missing.forEach(k => env[k] = `__FILL_${k}__`);
}

const out = Object.entries(env).map(([k, v]) => `${k}=${v}`).join("\n");
fs.writeFileSync(".env", out);

console.log("✅ ENV repaired. Please replace __FILL__ values if any.");