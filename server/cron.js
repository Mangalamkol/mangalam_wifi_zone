import cron from "node-cron";
import { expiryCheck } from "./jobs/expiry.job.js";

cron.schedule("*/1 * * * *", expiryCheck);

console.log("Cron jobs started.");
