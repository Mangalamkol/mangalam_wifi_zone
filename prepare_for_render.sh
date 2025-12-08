#!/usr/bin/env bash
set -euo pipefail
ROOT="$(pwd)"
# update server/package.json start to "node index.js" and add engines for node
if [ -f server/package.json ]; then
  echo "Updating server/package.json for Render..."
  node -e "let p=require('./server/package.json'); p.scripts=p.scripts||{}; p.scripts.start='node index.js'; p.engines=p.engines||{}; p.engines.node=p.engines.node||'18.x'; require('fs').writeFileSync('server/package.json', JSON.stringify(p,null,2));"
fi

if [ -f package.json ]; then
  echo "Ensuring root package.json has build/start hints..."
  node -e "let p=require('./package.json'); p.scripts=p.scripts||{}; if(!p.scripts['postinstall']) p.scripts['postinstall']='cd server && npm install'; require('fs').writeFileSync('package.json', JSON.stringify(p,null,2));"
fi

# create .env.example at repo root if missing (keeps secrets out)
if [ ! -f .env.example ]; then
  cat > .env.example <<'ENV'
# Render-ready .env template
MONGO_URI="mongodb+srv://<user>:<pw>@cluster0.mongodb.net/mangalamwifi"
JWT_SECRET="REPLACE_THIS"
PORT=5000
ENV
  echo ".env.example created"
fi

# commit + push
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git add server/package.json package.json .env.example || true
  git commit -m "chore(render): prepare package.json and .env.example for Render" || true
  git push origin HEAD || echo "git push failed"
fi

echo "Render auto-fix done. Please trigger a new Render deploy (or push to main)."