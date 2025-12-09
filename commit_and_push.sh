#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${GITHUB_REPO_URL:-https://github.com/MangalamKol/Mangalam-WiFi-Zone.git}"
BRANCH="${GITHUB_BRANCH:-main}"

if [ -z "$REPO_URL" ]; then
  echo "GITHUB_REPO_URL not set. Export it or fill .env file."
  exit 1
fi

git init 2>/dev/null || true
if ! git remote | grep -q origin; then
  git remote add origin "$REPO_URL"
fi

git add -A
git commit -m "Auto commit: $(date -u +"%Y-%m-%dT%H:%M:%SZ")" || echo "Nothing to commit"
git branch -M "$BRANCH" || true
git push -u origin "$BRANCH" --force
