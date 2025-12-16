const cron = require("node-cron");
const sessionCleanupService = require("../services/sessionCleanup.service");

cron.schedule("*/5 * * * *", async () => {
  console.log("Running expired sessions cleanup...");
  await sessionCleanupService.logic.cleanupSessions();
});
