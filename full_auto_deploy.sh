#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Load environment variables from .env file robustly
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# --- Sanity Checks ---
: "${RENDER_SERVICE_ID:?please set RENDER_SERVICE_ID in your .env file}"
: "${RENDER_API_KEY:?please set RENDER_API_KEY in your .env file}"

echo "✅ Sanity checks passed. Required variables are set."

# --- Render Deployment ---
echo "INFO: Triggering Render deployment..."

curl -X POST \
  -H "Authorization: Bearer ${RENDER_API_KEY}" \
  -H "Accept: application/json" \
  "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys"

echo "🚀 Deployment triggered on Render. Monitor the Render dashboard for progress."
echo "🎉 Pipeline finished successfully!"
