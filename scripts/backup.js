import fs from "fs";
import path from "path";
import { exec } from "child_process";

const BACKUP_DIR = "/var/data/backups"; // Render persistent disk
const TIMESTAMP = new Date().toISOString().replace(/[:.]/g, "-");

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const mongoUri = process.env.MONGO_URI;
const outputFile = `${BACKUP_DIR}/mongo-backup-${TIMESTAMP}.gz`;

const cmd = `mongodump --uri="${mongoUri}" --archive=${outputFile} --gzip`;

exec(cmd, (err) => {
  if (err) {
    console.error("❌ Backup failed:", err.message);
  } else {
    console.log("✅ Backup created:", outputFile);
  }
});