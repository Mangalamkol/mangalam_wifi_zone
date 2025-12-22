import { agenda } from "../utils/agenda.js";

const job = async () => {
  console.log("Running heartbeat cron job");
  await agenda.every("10 seconds", "HEARTBEAT");
};

job();
