const fs = require("fs");
const path = require("path");

const masterPath = path.join(__dirname, "..", "env.master.json");
if (!fs.existsSync(masterPath)) {
  console.error("❌ env.master.json missing");
  process.exit(1);
}

const master = JSON.parse(fs.readFileSync(masterPath));
let finalEnv = {};

for (const key in master) {
  if (process.env[key]) {
    finalEnv[key] = process.env[key];        // Render ENV
  } else if (master[key] === "__AUTO__") {
    finalEnv[key] = process.env.RENDER_EXTERNAL_URL || "";
  } else if (String(master[key]).startsWith("__")) {
    continue; // optional / local
  } else {
    finalEnv[key] = master[key];
  }
}

fs.writeFileSync(
  path.join(process.cwd(), ".env"),
  Object.entries(finalEnv).map(([k, v]) => `${k}=${v}`).join("\n")
);

console.log("✅ ENV auto-generated");