#!/usr/bin/env bash
set -euo pipefail

# load .env if present
if [ -f .env ]; then
  export $(grep -v \'^#\' .env | xargs)
fi

# sanity checks
: "${GITHUB_REPO_URL:?please set GITHUB_REPO_URL in env or .env}"
: "${RENDER_SERVICE_ID:?please set RENDER_SERVICE_ID in env or .env}"
: "${RENDER_API_KEY:?please set RENDER_API_KEY in env or .env}"
BRANCH="${GITHUB_BRANCH:-main}"

echo "=== START FULL AUTO DEPLOY PIPELINE ==="

# 1) Commit & push
./commit_and_push.sh

# 2) Build web client if exists
if [ -d "web_client" ]; then
  echo "Building web_client..."
  cd web_client
  npm install --no-audit --no-fund --silent || true
  npm run build || { echo "web_client build failed"; cd -; exit 1; }
  cd -
fi

# 3) Build server (optional)
if [ -d "server" ]; then
  echo "Installing server deps..."
  cd server
  npm install --no-audit --no-fund --silent || true
  cd -
fi

# 4) Trigger Render deploy
if ./render_trigger_deploy.sh; then
  echo "Deployment succeeded."
  echo "=== PIPELINE COMPLETE ==="
  exit 0
else
  echo "Deployment failed — attempting rollback to last successful commit..."

  # find last successful deploy and redeploy using its commit
  LAST_SUCCESS=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" "https://api.render.com/v1/services/$RENDER_SERVICE_ID/deploys" | \
    grep -oE \'"commit"[[:space:]]*:[[:space:]]*"[^"]+"|"state"[[:space:]]*:[[:space:]]*"[^"]+"\' | \
    paste - - | grep \'"state": "success"\' | head -1 | sed -E \'s/.*"commit"[[:space:]]*:[[:space:]]*"([^"]+)".*/\\1/\')

  if [ -z "$LAST_SUCCESS" ]; then
    echo "No previous successful deploy found. Manual intervention required."
    exit 2
  fi

  echo "Last successful commit: $LAST_SUCCESS — redeploying it..."
  export COMMIT_SHA="$LAST_SUCCESS"
  if ./render_trigger_deploy.sh; then
    echo "Rollback redeploy successful."
    exit 0
  else
    echo "Rollback redeploy failed. Manual restore required."
    exit 3
  fi
fi