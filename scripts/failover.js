import { agenda } from "../utils/agenda.js";

const job = async () => {
  console.log("Running failover cron job");
  await agenda.every("5 minutes", "CHECK_FAILOVER");
};

job();
