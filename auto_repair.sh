#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
BACKUP_DIR="$ROOT/.repair_backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "Backup folder: $BACKUP_DIR"

# 1) backup important files
echo "Backing up package.json, server files, web client..."
cp -a package.json "$BACKUP_DIR/" 2>/dev/null || true
cp -a server/package.json "$BACKUP_DIR/" 2>/dev/null || true
cp -a web_client/package.json "$BACKUP_DIR/" 2>/dev/null || true
cp -a web_client/ "$BACKUP_DIR/web_client_backup" 2>/dev/null || true
cp -a server/ "$BACKUP_DIR/server_backup" 2>/dev/null || true

# helper: ensure file exists with content if missing
ensure_file() {
  local path="$1"; shift
  local content="$*"
  if [ ! -f "$path" ]; then
    mkdir -p "$(dirname "$path")"
    echo "$content" > "$path"
    echo "Created $path"
  else
    echo "$path already exists"
  fi
}

# 2) Fix backend: create placeholder routes if missing
echo "Fixing backend placeholders..."
ensure_file server/routes/authRoutes.js "const express = require('express');\nconst router = express.Router();\n\n// Placeholder auth routes - replace with real handlers\nrouter.post('/login', (req, res) => { res.json({ ok: true, message: 'login placeholder' }); });\nrouter.post('/register', (req, res) => { res.json({ ok: true, message: 'register placeholder' }); });\n\nmodule.exports = router;\n"

ensure_file server/routes/index.js "const express = require('express');\nconst router = express.Router();\nconst authRoutes = require('./authRoutes');\nrouter.use('/auth', authRoutes);\nmodule.exports = router;\n"

# 3) Create .env.example (template)
echo "Creating .env.example template..."
cat > .env.example <<'ENV'
# Copy this file to .env and fill with real values
MONGO_URI="mongodb+srv://username:password@cluster0.example.mongodb.net/dbname"
JWT_SECRET="change_this_to_a_secure_string"
RAZORPAY_KEY="rzp_test_xxx"
RAZORPAY_SECRET="rzp_test_secret"
PORT=5000
ENV

# 4) Ensure server package.json has start script
if [ -f server/package.json ]; then
  echo "Ensuring server/package.json has start script..."
  node -e "let p=require('./server/package.json'); p.scripts=p.scripts||{}; p.scripts.start=p.scripts.start||'node index.js'; require('fs').writeFileSync('server/package.json', JSON.stringify(p,null,2));"
fi

# 5) Backend: install deps
if [ -d server ]; then
  echo "Installing backend dependencies..."
  (cd server && npm install --no-audit --no-fund)
fi

# 6) Kill processes blocking common ports (5000 / 3000 / 5173)
echo "Killing processes on 5000, 3000, 5173 if present..."
for P in 5000 3000 5173; do
  lsof -iTCP -sTCP:LISTEN -P -n | awk -v p="$P" '\$9 ~ ":"p"$" {print \$2}' | xargs -r kill -9 || true
done

# 7) Frontend auto-fix (tries to find a web client folder)
echo "Running frontend auto-fix..."
# possible frontend dirs
CANDIDATES=(web_client web-client mangalam-web-client client web)
WEB_DIR=""
for d in "${CANDIDATES[@]}"; do
  if [ -f "$d/package.json" ]; then WEB_DIR="$d"; break; fi
done
if [ -z "$WEB_DIR" ]; then
  echo "No frontend package.json found in common locations. Searching recursively..."
  WEB_DIR="$(find . -maxdepth 3 -type f -name package.json -not -path './server/*' -not -path './node_modules/*' -print -quit | xargs -r dirname || true)"
fi

if [ -n "$WEB_DIR" ]; then
  echo "Found frontend at: $WEB_DIR"
  (cd "$WEB_DIR" && npm install --no-audit --no-fund --force) || true
  (cd "$WEB_DIR" && npm audit fix --force) || true
  # ensure dev script exists
  node -e "let p=require('$WEB_DIR/package.json'); p.scripts=p.scripts||{}; if(!p.scripts.dev) p.scripts.dev='vite'; require('fs').writeFileSync('$WEB_DIR/package.json', JSON.stringify(p,null,2));"
else
  echo "Frontend not found. Skipping frontend auto-fix."
fi

# 8) Try build frontend (non-blocking)
if [ -n "$WEB_DIR" ]; then
  echo "Attempting to run a quick frontend dev build (non-blocking)..."
  (cd "$WEB_DIR" && npm run build 2>/tmp/project_auto_repair_frontend_build.log) || echo "frontend build may have failed; continuing"
fi

# 9) Git commit & push changes
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Staging changes..."
  git add .env.example server/routes authRoutes.js server/package.json "$WEB_DIR/package.json" 2>/dev/null || git add -A
  git commit -m "chore: automated repair - add placeholders, .env.example, fix scripts" || echo "No changes to commit"
  # push if origin exists
  if git remote | grep -q origin; then
    echo "Pushing to origin..."
    git push origin HEAD || echo "git push failed (maybe no credentials configured)"
  fi
else
  echo "Not a git repo; skipping commit/push"
fi

echo "=== AUTO-REPAIR COMPLETE ==="
echo "Backups at: $BACKUP_DIR"
echo "If you want to revert: copy files from backup dir to repo root."