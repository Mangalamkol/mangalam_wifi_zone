import { loadEnv } from "./env.auto.js";
import { audit } from "./project.audit.js";
import { repair } from "./project.repair.js";
import { decision } from "./decision.report.js";

console.log("🚀 Mangalam WiFi Zone — MASTER RUN");

const envStatus = loadEnv();
const auditReport = audit();
const repaired = repair(auditReport);

decision(auditReport, repaired, envStatus);
