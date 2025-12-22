const { execSync } = require("child_process");

function run(cmd) {
  console.log("▶", cmd);
  execSync(cmd, { stdio: "inherit" });
}

run("node scripts/sync-env.cjs");
run("node scripts/audit.js");
run("pm2 start server/server.js --name mangalam-server");
run("pm2 start scripts/local-agent.js --name mangalam-agent");
run("pm2 save");

console.log("\n✅ SYSTEM ONLINE & STABLE");