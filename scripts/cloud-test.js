import dotenv from "dotenv";
dotenv.config({ path: "server/.env" });

import { notifyCloud } from "../lib/notifyCloud.js";

async function main() {
  console.log("☁️ Notifying cloud server...");

  try {
    await notifyCloud("test", { message: "Hello from the agent!" });
    console.log("✅ Cloud notification sent successfully");
  } catch (error) {
    console.error("❌ Cloud notification failed");
    console.error(error.message);
  }
}

main();
