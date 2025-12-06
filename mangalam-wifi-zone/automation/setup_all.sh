#!/usr/bin/env bash
set -euo pipefail
echo "==> setup_all.sh — installing dependencies for server/admin/web_client"

echo "--- Installing server dependencies ---"
if [ -d "server" ]; then
  cd server
  if [ -f package.json ]; then
    npm install
  fi
  cd ..
fi

echo "--- Installing admin dependencies ---"
if [ -d "admin" ]; then
  cd admin
  if [ -f package.json ]; then
    npm install
  fi
  cd ..
fi

echo "--- Installing web_client dependencies ---"
if [ -d "web_client" ]; then
  cd web_client
  if [ -f package.json ]; then
    npm install
  fi
  cd ..
fi

echo "--- Installing Flutter deps (optional) ---"
if [ -d "client_flutter" ]; then
  if command -v flutter >/dev/null 2>&1; then
    cd client_flutter
    flutter pub get || echo "flutter pub get failed or flutter not configured in this environment"
    cd ..
  else
    echo "flutter command not found — skip flutter pub get"
  fi
fi

echo "==> All deps installation finished."