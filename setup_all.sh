#!/usr/bin/env bash
set -e

echo "=============================="
echo " Mangalam WiFi Zone – MASTER SETUP "
echo "=============================="

### 1️⃣ ENV CHECK
REQUIRED_VARS=(
  OC200_URL
  OC200_USERNAME
  OC200_PASSWORD
  MONGO_URI
  JWT_SECRET
  PORT
)

echo "[1/7] Checking environment variables..."
for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "❌ Missing ENV: $VAR"
    exit 1
  fi
done
echo "✅ ENV OK"

### 2️⃣ DEPENDENCIES
echo "[2/7] Installing dependencies..."
npm install
npm install --prefix server
npm install pm2 --no-save

### 3️⃣ PROJECT AUDIT + AUTO REPAIR
echo "[3/7] Running audit & auto-repair..."
node scripts/project_master_audit_and_repair.js

### 4️⃣ DATABASE CHECK
echo "[4/7] Verifying MongoDB..."
node scripts/db_health_check.js

### 5️⃣ START CLOUD SERVER
echo "[5/7] Starting cloud server..."
./node_modules/.bin/pm2 start server/server.js \
  --name mangalam-server \
  --time

### 6️⃣ START LOCAL OC200 AGENT
echo "[6/7] Starting OC200 local agent..."
./node_modules/.bin/pm2 start scripts/local-agent.js \
  --name mangalam-oc200-agent \
  --time

### 7️⃣ SECURITY HARDENING
echo "[7/7] Applying security hardening..."

# disable stack traces in prod
export NODE_ENV=production

# file permissions
chmod 600 .env
chmod 600 server/.env || true

# pm2 protections
./node_modules/.bin/pm2 set pm2:kill_timeout 3000
./node_modules/.bin/pm2 set pm2:max_memory_restart 300M

./node_modules/.bin/pm2 save

echo "=============================="
echo " ✅ SYSTEM ONLINE & HARDENED "
echo "=============================="
./node_modules/.bin/pm2 ls