import fs from "fs";
import path from "path";
import { exec } from "child_process";
import cron from "node-cron";

const BACKUP_DIR = "/var/data/backups";

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

cron.schedule("0 2 * * *", () => {
  const DATE = new Date().toISOString().split("T")[0];
  const file = `${BACKUP_DIR}/mongo-backup-${DATE}.gz`;

  const cmd = `mongodump --uri="${process.env.MONGO_URI}" --archive=${file} --gzip`;

  exec(cmd, (err) => {
    if (err) {
      console.error("[BACKUP FAILED]", err.message);
    } else {
      console.log("[BACKUP OK]", file);
    }
  });
});