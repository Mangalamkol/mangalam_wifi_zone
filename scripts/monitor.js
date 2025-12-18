import cron from "node-cron";
import os from "os";

cron.schedule("*/5 * * * *", () => {
  const mem = (os.totalmem() - os.freemem()) / 1024 / 1024;
  const uptime = process.uptime();

  console.log(
    `[MONITOR] Uptime: ${Math.floor(uptime / 60)} min | RAM Used: ${mem.toFixed(
      2
    )} MB`
  );
});