
const functions = require("firebase-functions");
const { logic: couponExpiryLogic } = require("../services/couponExpiry.service");
const { logic: sessionCleanupLogic } = require("../services/sessionCleanup.service");

/**
 * A scheduled function that runs daily at midnight to perform maintenance tasks.
 */
exports.midnightOrchestrator = functions.pubsub.schedule('every day 00:00').onRun(async (context) => {
  console.log("Midnight orchestrator is running...");

  try {
    console.log("Starting coupon expiry process...");
    await couponExpiryLogic.expireCoupons();
    console.log("Coupon expiry process finished.");
  } catch (error) {
    console.error("Error during coupon expiry process:", error);
  }

  try {
    console.log("Starting session cleanup process...");
    await sessionCleanupLogic.cleanupSessions();
    console.log("Session cleanup process finished.");
  } catch (error) {
    console.error("Error during session cleanup process:", error);
  }

  console.log("Midnight orchestrator has finished.");
  return null;
});
