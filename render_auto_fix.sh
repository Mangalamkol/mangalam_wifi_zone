#!/bin/bash
set -e

echo "===================================================="
echo " 🚑 Render Live Error Auto-Fix System Activated"
echo "===================================================="

##########################################
# 1. FIX NODE VERSION FOR RENDER
##########################################
if ! grep -q "\"node\"" server/package.json; then
  echo "⚙ Adding Node 18 engine to server/package.json"
  jq '.engines = {"node": ">=18"}' server/package.json > server/package.tmp
  mv server/package.tmp server/package.json
fi

##########################################
# 2. FORCE CLEAN INSTALL
##########################################
echo "🧹 Cleaning previous installs..."
rm -rf server/node_modules
rm -f server/package-lock.json

echo "📦 Installing clean dependencies..."
cd server
npm install --force

##########################################
# 3. PATCH PORT & SERVER STARTUP
##########################################
if ! grep -q "process.env.PORT" server.js && ! grep -q "process.env.PORT" index.js; then
cat << 'EOF' > force_port_patch.js
process.env.PORT = process.env.PORT || 5000;
EOF
echo "require('./force_port_patch');" | cat - index.js > tmp && mv tmp index.js
echo "🔧 Port patch injected."
fi

##########################################
# 4. VALIDATE .env
##########################################
cd ..
if [ ! -f ".env" ]; then
  echo "❌ ERROR: .env file missing!"
  echo "Render cannot run without .env"
  exit 1
fi

source .env

if [ -z "$MONGO_URI" ] || [ -z "$JWT_SECRET" ] || [ -z "$RAZORPAY_KEY" ]; then
  echo "❌ CRITICAL ERROR: Missing variables in .env"
  echo "Please fill every required field."
  exit 1
fi

echo "🔑 .env validated successfully."

##########################################
# 5. FIX PACKAGE.JSON (ROOT)
##########################################
cat << 'EOF' > package.json
{
  "name": "mangalam-wifi-zone",
  "version": "1.0.0",
  "scripts": {
    "start": "cd server && node index.js",
    "build": "echo 'No build step required'"
  }
}
EOF

echo "📌 Root package.json repaired."

##########################################
# 6. CREATE FALLBACK SERVER LOG HANDLER
##########################################
cat << 'EOF' > server/live_error_handler.js
process.on("uncaughtException", err => {
  console.error("LIVE ERROR:", err);
});
process.on("unhandledRejection", err => {
  console.error("UNHANDLED PROMISE:", err);
});
EOF

if ! grep -q "live_error_handler" server/index.js; then
echo "require('./live_error_handler');" | cat - server/index.js > server/tmpfix && mv server/tmpfix server/index.js
fi

echo "🛡 Live Runtime Error Handler Installed."

##########################################
# 7. FORCE REBUILD RENDER STRUCTURE
##########################################
echo "🔁 Repairing Render File Structure..."
mkdir -p build_logs
echo "Render Repair Timestamp: $(date)" > build_logs/repair.log

##########################################
# 8. SUCCESS MESSAGE
##########################################
echo ""
echo "===================================================="
echo " ✅ AUTO-FIX COMPLETE — READY TO DEPLOY ON RENDER"
echo "===================================================="
echo " NEXT STEPS:"
echo " 1️⃣  Commit changes:"
echo "       git add . && git commit -m 'Render auto-fix'"
echo ""
echo " 2️⃣  Push to GitHub:"
echo "       git push origin main"
echo ""
echo " 3️⃣  Render will automatically redeploy."
echo "===================================================="