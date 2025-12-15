#!/usr/bin/env bash
set -euo pipefail
if [ ! -f server/.env ]; then
  echo "Warning: server/.env not found. Create one from server/.env.example before starting."
fi
echo "Starting server (localhost) ..."
cd server
npm start
