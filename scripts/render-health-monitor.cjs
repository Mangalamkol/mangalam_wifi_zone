/**
 * Render Health Monitor
 * Checks:
 *  - Express server alive
 *  - MongoDB connectivity
 *  - Sends alert on failure
 */

const axios = require("axios");
const mongoose = require("mongoose");

const {
  PORT = 10000,
  MONGO_URI,
  ALERT_WEBHOOK
} = process.env;

async function sendAlert(message) {
  if (!ALERT_WEBHOOK) return;
  try {
    await axios.post(ALERT_WEBHOOK, {
      text: `🚨 Mangalam WiFi Zone Alert\n${message}`
    });
  } catch (_) {}
}

async function checkServer() {
  try {
    await axios.get(`http://localhost:${PORT}/health`, { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

async function checkMongo() {
  try {
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    await mongoose.disconnect();
    return true;
  } catch {
    return false;
  }
}

(async () => {
  const serverOK = await checkServer();
  const mongoOK = await checkMongo();

  if (!serverOK || !mongoOK) {
    await sendAlert(
      `Health Check Failed\nServer: ${serverOK}\nMongoDB: ${mongoOK}`
    );
    process.exit(1);
  }

  console.log("✅ Render Health OK");
  process.exit(0);
})();