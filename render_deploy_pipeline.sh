#!/usr/bin/env bash
set -euo pipefail
BRANCH="${1:-main}"

echo "🚀 Starting Render Deployment Pipeline..."

# Step 1: Run the backend auto-fix
echo "🔧 Fixing backend for Render..."
if [ -f ./render_auto_fix.sh ]; then
    chmod +x ./render_auto_fix.sh
    ./render_auto_fix.sh
else
    echo "Warning: render_auto_fix.sh not found. Skipping backend fix."
fi

# Step 2: Run the frontend auto-fix
echo "💅 Fixing frontend..."
FRONTEND_DIR="mangalam-wifi-zone/web_client"
if [ -f ./frontend_auto_fix.sh ] && [ -d "$FRONTEND_DIR" ]; then
    chmod +x ./frontend_auto_fix.sh
    ./frontend_auto_fix.sh "$FRONTEND_DIR"
else
    echo "Warning: frontend_auto_fix.sh or directory $FRONTEND_DIR not found. Skipping frontend fix."
fi

# Step 3: Commit all changes and push to the remote branch
echo "📦 Committing and pushing all changes to branch: $BRANCH..."
git add -A
git commit -m "deploy: auto-fix and prepare for render deployment" || echo "No new changes to commit."

# Check if remote origin exists before pushing
if git remote -v | grep -q "origin"; then
    git push origin "$BRANCH"
    echo "✅ Pipeline finished. Pushed to $BRANCH."
    echo "If your Render service is connected to this repo and branch, a new build should start automatically."
else
    echo "⚠️ Git remote 'origin' not found. Skipping push."
    echo "Please add a remote repository and push manually."
fi
