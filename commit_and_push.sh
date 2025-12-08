#!/usr/bin/env bash
set -euo pipefail
BRANCH="${1:-main}"
git add -A
git commit -m "auto: repair and prepare for deploy" || true
git push origin "$BRANCH"
echo "Pushed to $BRANCH. If your Render service is connected to this repo+branch it will start a build automatically."