import cron from "node-cron";
import Device from "../models/device.model.js";
import { ocUnauthorize } from "../services/oc200.service.js";

// This job runs every minute to check for and handle expired sessions.

cron.schedule("*/1 * * * *", async () => {
  console.log("Running expired session check...");
  const now = new Date();

  // Find devices where the session has expired.
  const expiredDevices = await Device.find({ expiresAt: { $lt: now } });

  if (expiredDevices.length === 0) {
    console.log("No expired sessions found.");
    return;
  }

  console.log(`Found ${expiredDevices.length} expired session(s).`);

  for (const device of expiredDevices) {
    try {
      console.log(`Unauthorizing device with MAC: ${device.mac}`);
      // Unauthorize the device from the OC200 controller.
      await ocUnauthorize(device.mac);

      // Delete the device record from the database.
      await Device.findByIdAndDelete(device._id);
      console.log(`Successfully removed session for MAC: ${device.mac}`);
    } catch (error) {
      console.error(`Failed to process expired session for MAC: ${device.mac}`, error);
      // Decide on an error handling strategy. You might want to retry later
      // or alert an administrator if a device consistently fails to be unauthorized.
    }
  }
});
