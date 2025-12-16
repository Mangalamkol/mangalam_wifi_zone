const { onDocumentUpdated } = require("firebase-functions/v2/firestore");
const { HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { getAuthToken } = require("./omada-api");
const axios = require("axios");

const { OMADA_BASE_URL, OMADA_SITE_ID } = process.env;

exports.sessionEnforcement = onDocumentUpdated("sessions/{sessionId}", async (event) => {
  const newValue = event.data.after.data();
  const oldValue = event.data.before.data();

  if (newValue.forcedDisconnect && !oldValue.forcedDisconnect) {
    const macAddress = newValue.macAddress;
    const sessionId = event.params.sessionId;

    if (macAddress) {
      console.log(`Disconnecting device with MAC address: ${macAddress}`);
      await exports.disconnectDeviceByMac(macAddress);
      console.log(`Device ${macAddress} disconnected successfully.`);
    } else {
      console.error(`No MAC address found for session: ${sessionId}`);
    }
  }
});

exports.disconnectDeviceByMac = async (macAddress) => {
    try {
        const token = await getAuthToken();
        await axios.post(`${OMADA_BASE_URL}/${OMADA_SITE_ID}/api/v2/hotspot/clients/${macAddress}/disconnect`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Error disconnecting device:', error);
        throw new HttpsError('internal', 'Could not disconnect device');
    }
};

exports.disconnectSession = async (sessionId) => {
    const sessionRef = admin.firestore().collection('sessions').doc(sessionId);
    const sessionDoc = await sessionRef.get();
    if (sessionDoc.exists) {
        await sessionRef.update({ forcedDisconnect: true });
    }
};

exports.enforceCouponExpiry = async (couponId) => {
    const sessionsRef = admin.firestore().collection('sessions');
    const query = sessionsRef.where('couponId', '==', couponId).where('sessionState', '==', 'active');
    const snapshot = await query.get();
    if (!snapshot.empty) {
        for (const doc of snapshot.docs) {
            await exports.disconnectSession(doc.id);
        }
    }
};
