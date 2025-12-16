
const functions = require("firebase-functions");
const admin = require("firebase-admin");

/**
 * Deletes old session documents from the database.
 * This function is designed to be called by a scheduler (e.g., daily).
 */
async function cleanupSessions() {
  const db = admin.firestore();
  const sessionsRef = db.collection("sessions");

  const snapshot = await sessionsRef.get();

  if (snapshot.empty) {
    console.log("No sessions to clean up.");
    return;
  }

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const batch = db.batch();
  let deletedCount = 0;

  snapshot.docs.forEach((doc) => {
    const session = doc.data();
    const sessionStart = session.start.toDate(); // Convert Firestore Timestamp to Date

    if (sessionStart < thirtyDaysAgo) {
      console.log(`Deleting session ${doc.id}`);
      batch.delete(doc.ref);
      deletedCount++;
    }
  });

  if (deletedCount > 0) {
    await batch.commit();
    console.log(`Deleted ${deletedCount} old sessions.`);
  } else {
    console.log("No old sessions to delete.");
  }
}

// We can expose this as a callable function for manual triggering.
exports.cleanupSessions = functions.https.onCall(async (data, context) => {
  // Optional: Add authentication check for manual triggers.
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
  // }

  try {
    await cleanupSessions();
    return { status: "success", message: "Session cleanup process completed." };
  } catch (error) {
    console.error("Error cleaning up sessions:", error);
    throw new functions.https.HttpsError("internal", "Failed to clean up sessions.");
  }
});

// Exporting the core logic for use in other parts of the application
module.exports.logic = {
    cleanupSessions
};
