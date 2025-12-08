#!/usr/bin/env bash
set -euo pipefail
WEB_DIR="${1:-web_client}"
if [ ! -d "$WEB_DIR" ] || [ ! -f "$WEB_DIR/package.json" ]; then
  echo "Frontend folder not found. Provide folder as first arg."
  exit 1
fi
cd "$WEB_DIR"
echo "Cleaning node_modules and lockfile..."
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock
echo "Installing dependencies (force)..."
npm install --no-audit --no-fund --force
echo "Running audit fix..."
npm audit fix --force || true

# ensure scripts
node -e "let p=require('./package.json'); p.scripts=p.scripts||{}; if(!p.scripts.dev) p.scripts.dev='vite'; if(!p.scripts.start) p.scripts.start='vite'; if(!p.scripts.build) p.scripts.build='vite build'; require('fs').writeFileSync('package.json', JSON.stringify(p,null,2));"
echo "Attempting build..."
npm run build || echo "Build failed (check logs)."

echo "Frontend auto-fix finished for $WEB_DIR"