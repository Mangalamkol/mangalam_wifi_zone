import cron from 'node-cron';
import backupLog from '../utils/backupLog.js';

// Schedule backup log to run daily at a specific time (e.g., 2:00 AM)
cron.schedule('0 2 * * *', () => {
  console.log('Running daily backup log...');
  backupLog();
});
