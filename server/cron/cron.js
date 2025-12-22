import cron from "node-cron";
import disableExpired from "./disableExpired.js";
import refundManager from "./refundManager.js";
import autoExpiryJob from "../jobs/autoExpiry.job.js";

// Schedule to run once every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running cron job: disableExpired");
  await disableExpired();
});

// Schedule to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("Running cron job: refundManager");
  await refundManager();
});

// Schedule to run every minute
cron.schedule("*/1 * * * *", async () => {
  console.log("Running cron job: autoExpiryJob");
  await autoExpiryJob();
});
