
import fs from "fs";
import path from "path";

function loadEnv() {
  const
    env = {},
    required = ["MONGO_URI", "AGENT_ID", "JWT_SECRET", "CLOUD_URL", "ALERT_WEBHOOK"],
    search = [".env", ".env.production", "server/.env", "render.env"];

  for (const f of search) {
    if (!fs.existsSync(f)) continue;
    const content = fs.readFileSync(f, "utf-8");
    for (const line of content.split("\n")) {
      const [k, v] = line.split("=");
      if (k && v) env[k.trim()] = v.trim();
    }
  }

  const missing = required.filter(k => !env[k]);
  return { ok: missing.length === 0, missing, env };
}

export { loadEnv };
