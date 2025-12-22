const fs = require("fs");

const required = [
  "server/server.js",
  "scripts/local-agent.js",
  "scripts/auto-expiry.js",
  "scripts/failover.js",
  "scripts/heartbeat.js"
];

let ok = 0;
let bad = [];

required.forEach(f => {
  if (fs.existsSync(f)) ok++;
  else bad.push(f);
});

console.log("📊 PROJECT AUDIT");
console.log("✔ Ready:", ok);
console.log("❌ Missing:", bad.length);

if (bad.length) {
  console.log("Missing files:");
  bad.forEach(f => console.log(" -", f));
}