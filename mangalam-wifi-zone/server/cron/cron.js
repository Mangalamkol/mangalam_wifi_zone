const cron = require("node-cron");
const disableExpired = require("./disableExpired");
const refundManager = require("./refundManager");

// Schedule to run once every day at midnight
cron.schedule("0 0 * * *", () => {
  console.log("Running cron job: disableExpired");
  disableExpired();
});

// Schedule to run every hour
cron.schedule("0 * * * *", () => {
  console.log("Running cron job: refundManager");
  refundManager();
});
