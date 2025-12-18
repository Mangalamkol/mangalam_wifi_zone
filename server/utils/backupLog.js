import fs from 'fs';

export default () => {
  fs.appendFileSync(
    "./logs/backup.log",
    `BACKUP OK - ${new Date().toISOString()}\n`
  );
};
