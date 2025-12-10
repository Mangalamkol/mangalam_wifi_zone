const Transaction = require("../models/Transaction");

module.exports = async function refundManager() {
  try {
    const pendingRefunds = await Transaction.find({ status: "refund_pending" });

    if (pendingRefunds.length === 0) {
      return 0; // No pending refunds
    }

    for (let tx of pendingRefunds) {
      console.log("Processing refund for:", tx.razorpayPaymentId);

      // TODO: Add Razorpay refund API call here in Phase 2

      // For now, we'll mark it as refunded
      tx.status = "refunded";
      await tx.save();
    }

    console.log(`Refund cycle complete: ${pendingRefunds.length} processed.`);
    return pendingRefunds.length;
  } catch (err) {
    console.error("refundManager() ERROR:", err.message);
    return 0;
  }
};
