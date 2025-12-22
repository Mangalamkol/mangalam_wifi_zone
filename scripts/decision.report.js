export function decision(audit, repaired, envStatus) {
  console.log("\n===== FINAL PROJECT DECISION =====");

  if (!envStatus.ok) {
    console.log("❌ BLOCKED: Missing ENV");
    console.log(envStatus.missing);
    return;
  }

  const pending = Object.entries(audit.features)
    .filter(([_, v]) => !v)
    .map(([k]) => k);

  if (pending.length === 0) {
    console.log("✅ PROJECT 100% COMPLETE");
  } else {
    console.log("⚠️ PARTIALLY COMPLETE");
    console.log("Pending:", pending);
  }

  if (repaired.length) {
    console.log("🛠 Auto-repaired:", repaired);
  }
}
