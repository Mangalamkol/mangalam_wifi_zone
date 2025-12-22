const fs = require("fs");
const path = require("path");

const masterPath = path.join(process.cwd(), "env.master.json");
const envPath = path.join(process.cwd(), ".env");

if (!fs.existsSync(masterPath)) {
  console.error("❌ env.master.json NOT FOUND");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(masterPath, "utf-8"));

let envContent = "";
for (const k in data) {
  envContent += `${k}=${data[k]}\n`;
  process.env[k] = data[k];
}

fs.writeFileSync(envPath, envContent);

console.log("✅ ENV loaded & .env generated");