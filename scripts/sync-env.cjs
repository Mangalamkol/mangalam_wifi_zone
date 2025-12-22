const fs = require("fs");
const path = require("path");

const masterPath = path.join(__dirname, "../env.master.json");
if (!fs.existsSync(masterPath)) {
  console.error("❌ env.master.json not found");
  process.exit(1);
}

const env = JSON.parse(fs.readFileSync(masterPath, "utf8"));

const envText = Object.entries(env)
  .map(([k, v]) => `${k}=${v}`)
  .join("\n");

// write server .env
fs.writeFileSync("server/.env", envText);
fs.writeFileSync("server/.env.production", envText);

// write agent env
fs.writeFileSync("scripts/agent.env", envText);

console.log("✅ ENV synced successfully");