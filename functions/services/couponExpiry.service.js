
const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * Marks coupons as expired if their validity period has ended.
 * This function is designed to be called by a scheduler (e.g., daily).
 */
async function expireCoupons() {
  const db = admin.firestore();
  const now = admin.firestore.Timestamp.now();

  const activeCouponsRef = db.collection("coupons");
  const snapshot = await activeCouponsRef
    .where("validity.end", "<=", now)
    .where("status", "==", "active")
    .get();

  if (snapshot.empty) {
    console.log("No active coupons have expired.");
    return;
  }

  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    console.log(`Expiring coupon ${doc.id}`);
    batch.update(doc.ref, { status: "expired" });
  });

  await batch.commit();
  console.log(`Expired ${snapshot.size} coupons.`);
}

// We will likely trigger this from the midnightOrchestrator, 
// but we can also expose it as a callable function for manual triggering.
exports.expireCoupons = functions.https.onCall(async (data, context) => {
  // Optional: Add authentication check to ensure only authorized users can trigger this.
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }
  
  try {
    await expireCoupons();
    return { status: "success", message: "Coupon expiry process completed." };
  } catch (error) {
    console.error("Error expiring coupons:", error);
    throw new functions.https.HttpsError("internal", "Failed to expire coupons.");
  }
});

// Exporting the core logic so it can be called from other services/schedulers
module.exports.logic = {
    expireCoupons
};
