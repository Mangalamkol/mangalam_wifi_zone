import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });

import { Omada } from "./lib/Omada.js";
import { notifyCloud } from "./lib/notifyCloud.js";

const omada = new Omada({
  baseURL: process.env.OC200_URL,
  username: process.env.OC200_USERNAME,
  password: process.env.OC200_PASSWORD,
  omadacId: process.env.OC200_SITE_ID
});

(async () => {
  try {
    console.log("🔐 Logging into OC200...");
    await omada.login();
    console.log("✅ OC200 Login Success");

    // Example: authorize device
    const mac = "F6:31:34:66:F5:FF";
    await omada.authorizeClient(mac, 60);
    console.log("✅ Client Authorized:", mac);

    await notifyCloud("session-started", {
      mac,
      minutes: 60
    });

  } catch (err) {
    console.error("❌ AGENT ERROR:", err.message);
  }
})();
