import fs from "fs";

export function repair(audit) {
  let repaired = [];

  if (!audit.features.HEALTH) {
    fs.writeFileSync(
      "scripts/render-health-monitor.cjs",
      `
module.exports = () => ({
  status: "ok",
  time: new Date().toISOString()
});
`
    );
    repaired.push("render-health-monitor");
  }

  return repaired;
}
