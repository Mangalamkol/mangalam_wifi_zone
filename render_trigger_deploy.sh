#!/usr/bin/env bash
set -euo pipefail

# requires: RENDER_SERVICE_ID and RENDER_API_KEY env vars set
SERVICE_ID="${RENDER_SERVICE_ID:?}"
API_KEY="${RENDER_API_KEY:?}"
BRANCH="${GITHUB_BRANCH:-main}"
COMMIT_SHA="${COMMIT_SHA:-$(git rev-parse --short HEAD)}"

echo "Triggering Render deploy for service $SERVICE_ID (commit $COMMIT_SHA)..."

# Trigger a deploy - this endpoint accepts commit (may vary by Render API version)
RESP=$(curl -s -X POST "https://api.render.com/v1/services/$SERVICE_ID/deploys" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"commit\": \"$COMMIT_SHA\", \"branch\": \"$BRANCH\"}")

echo "Trigger response: $RESP"

# extract deploy id if present
DEPLOY_ID=$(echo "$RESP" | grep -oE '"id"[[:space:]]*:[[:space:]]*"[^"]+"' | head -1 | sed -E 's/.*"([^"]+)".*/\1/')

if [ -z "$DEPLOY_ID" ]; then
  echo "Could not read deploy id. Response: $RESP"
  exit 1
fi

echo "Deploy started: $DEPLOY_ID. Polling status..."

# poll status
for i in {1..60}; do
  sleep 5
  STATUS_JSON=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$SERVICE_ID/deploys/$DEPLOY_ID")
  STATUS=$(echo "$STATUS_JSON" | grep -oE '"state"[[:space:]]*:[[:space:]]*"[^"]+"' | sed -E 's/.*"([^"]+)".*/\1/')
  echo "[$i] status: $STATUS"
  if [[ "$STATUS" == "success" ]]; then
    echo "Deploy successful."
    exit 0
  elif [[ "$STATUS" == "failed" ]] || [[ "$STATUS" == "canceled" ]]; then
    echo "Deploy failed: $STATUS"
    exit 2
  fi
done

echo "Timeout waiting for deploy to finish"
exit 3
