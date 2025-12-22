const { execSync } = require("child_process");

function run(cmd) {
  console.log("▶", cmd);
  execSync(cmd, { stdio: "inherit" });
}

run("node scripts/env.loader.cjs");
run("node audit.cjs");

// start server
run("pm2 restart server/server.js --name mangalam-server");

// start agent
run("pm2 restart scripts/local-agent.js --name mangalam-agent");

// save pm2
run("pm2 save");

console.log("✅ SYSTEM ONLINE & STABLE");