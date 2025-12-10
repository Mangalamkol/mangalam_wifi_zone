#!/usr/bin/env bash
set -euo pipefail
MSG=${1:-"deploy: $(date +'%Y-%m-%d %H:%M:%S')"}
echo "1/4 Installing dependencies..."
./setup_all.sh
echo "2/4 Building client apps..."
./build_all.sh
echo "3/4 Adding changes to git..."
git add .
git commit -m "$MSG" || echo "No changes to commit"
echo "4/4 Pushing to origin main..."
git push origin main
echo "✅ Pushed. GitHub Actions will build & Render will deploy."
