#!/usr/bin/env bash
set -euo pipefail
echo "==> build_all.sh — building admin & web_client"

if [ -d "admin" ]; then
  echo "--- Building admin"
  cd admin
  npm run build
  cd ..
fi

if [ -d "web_client" ]; then
  echo "--- Building web_client"
  cd web_client
  npm run build
  cd ..
fi

echo "==> Build complete."