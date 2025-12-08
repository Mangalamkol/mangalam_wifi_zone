#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Load environment variables from .env file robustly
# This is a safer way than `export $(grep ...)`
if [ -f .env ]; then
  set -a
  source .env
  set +a
fi

# --- Sanity Checks ---
# Ensure required variables are set, otherwise exit with a helpful message.
: "${GITHUB_REPO_URL:?please set GITHUB_REPO_URL in your .env file}"
: "${RENDER_SERVICE_ID:?please set RENDER_SERVICE_ID in your .env file}"
: "${RENDER_API_KEY:?please set RENDER_API_KEY in your .env file}"

echo "✅ Sanity checks passed. Required variables are set."

# --- Git Operations ---
echo "INFO: Checking git status..."
git status

# Add all changes to staging
echo "INFO: Adding all changes to git..."
git add .

# Commit changes. If there are no changes, `git commit` will fail.
# We use `|| echo "INFO: No changes to commit."` to catch this and continue.
echo "INFO: Committing changes..."
git commit -m "Auto-deploy: $(date +\'%Y-%m-%d %H:%M:%S\')" || echo "INFO: No changes to commit."

# Push changes to the main branch of the remote repository.
echo "INFO: Pushing code to GitHub..."
git push origin main

echo "✅ Code pushed to GitHub successfully."

# --- Render Deployment ---
echo "INFO: Triggering Render deployment..."

# Call the Render deploy hook using curl.
# -X POST: Specifies a POST request.
# -H "Authorization: Bearer ${RENDER_API_KEY}": Sets the authorization header.
# -H "Accept: application/json": Indicates we accept a JSON response.
# The URL targets the specific service and its deploy trigger.
curl -X POST \
  -H "Authorization: Bearer ${RENDER_API_KEY}" \
  -H "Accept: application/json" \
  "https://api.render.com/v1/services/${RENDER_SERVICE_ID}/deploys"

echo "🚀 Deployment triggered on Render. Monitor the Render dashboard for progress."
echo "🎉 Pipeline finished successfully!"

