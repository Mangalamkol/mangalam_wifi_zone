import { agenda } from "../utils/agenda.js";

const job = async () => {
  console.log("Running expiry cron job");
  await agenda.every("1 minute", "CHECK_EXPIRY");
};

job();
