/**
 * NO-PDF GUARD (FINAL)
 * Scans ONLY our source folders
 * Ignores dependencies & build artifacts
 */

import fs from "fs";
import path from "path";

const ROOT = process.cwd();

const ALLOWED_ROOTS = [
  "server",
  "scripts",
  "pages",
];

const IGNORE = [
  "node_modules",
  ".dart_tool",
  "android",
  "ios",
  "linux",
  "macos",
  "windows",
  "build",
  ".gradle",
  "package-lock.json",
  "package.json",
  "no_pdf_guard.js",
];

const FORBIDDEN = [
  "pdf",
  "upload",
  "importCoupon",
];

function scan(dir) {
  for (const item of fs.readdirSync(dir)) {
    if (IGNORE.includes(item)) continue;

    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      scan(full);
    } else {
      const content = fs.readFileSync(full, "utf8").toLowerCase();
      for (const word of FORBIDDEN) {
        if (content.includes(word)) {
          throw new Error(
            `FORBIDDEN keyword "${word}" in ${full}`
          );
        }
      }
    }
  }
}

try {
  for (const root of ALLOWED_ROOTS) {
    scan(path.join(ROOT, root));
  }
  console.log("✅ NO PDF / MANUAL COUPON CONFIRMED");
} catch (e) {
  console.error("❌", e.message);
  process.exit(1);
}
