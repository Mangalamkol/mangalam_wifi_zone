const cron = require("node-cron");
const Transaction = require("../models/Transaction");
const { refundPayment } = require("../utils/razorpayClient");
const logger = require("../utils/logger");

// This cron job will run every 5 minutes
const refundProcessingJob = cron.schedule("*/5 * * * *", async () => {
  logger.info("Running refund processing job...");

  const pendingRefunds = await Transaction.find({ status: "refund_pending" });

  if (pendingRefunds.length === 0) {
    logger.info("No pending refunds to process.");
    return;
  }

  for (const tx of pendingRefunds) {
    try {
      logger.info(`Processing refund for paymentId: ${tx.paymentId}`);
      const refundDetails = await refundPayment(tx.paymentId, tx.amount);

      tx.status = "refunded";
      tx.refundDetails = {
        refundId: refundDetails.id,
        amount: refundDetails.amount / 100, // Convert from paise
        processedAt: new Date(refundDetails.created_at * 1000),
      };
      await tx.save();
      logger.info(`Successfully processed refund for paymentId: ${tx.paymentId}`);
    } catch (error) {
      logger.error(`Failed to process refund for paymentId: ${tx.paymentId}`, error);
      tx.status = "refund_failed";
      tx.refundDetails = { error: error.message || "Unknown error" };
      await tx.save();
    }
  }
});

module.exports = { refundProcessingJob };
