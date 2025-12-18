const { exec } = require("child_process");
const logger = require("./logger");
require('dotenv').config();

const backupDB = () => {
    exec(
      `mongodump --uri="${process.env.MONGODB_URI}" --out=./server/backups/$(date +%F)`,
      (err) => {
        if (err) {
          logger.error("Mongo Backup Failed", { error: err.message, stack: err.stack });
        } else {
          logger.info("Mongo Backup Succeeded");
        }
      }
    );
}

module.exports = backupDB;
