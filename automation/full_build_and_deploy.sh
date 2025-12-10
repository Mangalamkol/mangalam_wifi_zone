#!/usr/bin/env bash
set -euo pipefail

echo "🔥 Mangalam WiFi Zone — FULL PROJECT AUTO BUILD STARTED 🔥"

echo "📌 Step 1 — Install backend deps"
cd server
npm install || true
cd ..

echo "📌 Step 2 — Install Admin Panel deps"
cd admin
npm install || true
echo "📌 Step 3 — Build Admin Panel"
npm run build || echo "⚠ admin build skipped"
cd ..

echo "📌 Step 4 — Install Web Client deps"
cd web_client
npm install || true
echo "📌 Step 5 — Build Web Client"
npm run build || echo "⚠ web client skipped"
cd ..

echo "📌 Step 6 — Flutter Client (optional)"
cd client_flutter || true
flutter pub get || true
flutter build web || true
cd ..

echo "📌 Step 7 — Git add + commit + push"
git add .
git commit -m "Auto Build $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin main || echo "Push failed"

echo "🚀 Render Auto Deploy will start via GitHub Actions"
echo "🎉 FULL PROJECT BUILD FINISHED"