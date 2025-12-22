import fs from "fs";

export function audit() {
  const report = {
    folders: [],
    files: [],
    features: {
      OC200: fs.existsSync("scripts/local-agent.js"),
      CLOUD_QUEUE: fs.existsSync("server/routes/agent.js"),
      AUTO_EXPIRY: fs.existsSync("scripts/expiry.cron.js"),
      FAILOVER: fs.existsSync("scripts/failover.js"),
      WEBHOOK: fs.existsSync("server/webhooks/expiry.js"),
      HEALTH: fs.existsSync("scripts/render-health-monitor.cjs")
    }
  };

  return report;
}
