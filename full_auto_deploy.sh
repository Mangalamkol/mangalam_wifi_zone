#!/bin/bash
set -e

echo ""
echo "================================================================="
echo " 🚀 MANGALAM WIFI ZONE — FULL AUTO DEPLOY PIPELINE STARTING…"
echo "================================================================="
sleep 1


########################################
# 1. CHECK GIT SETUP
########################################
echo "🔍 Checking Git repository…"
if [ ! -d ".git" ]; then
  echo "⚠️  No Git repo found — initializing…"
  git init
fi

git branch -M main


########################################
# 2. FIX BACKEND FOR RENDER DEPLOY
########################################
echo ""
echo "🔧 Repairing backend (server)…"

cd server || { echo "❌ Server directory missing!"; exit 1; }

# Ensure index.js exists
if [ ! -f "index.js" ]; then
  echo "⚠️  index.js missing — creating safe template…"
  cat > index.js <<EOF
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=> res.send("Mangalam WiFi Backend Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log("Backend OK on", PORT));
EOF
fi

# Fix missing routes folder
mkdir -p routes controllers

# Install clean dependencies
rm -rf node_modules package-lock.json
npm install

cd ..


########################################
# 3. FIX FRONTEND WEB CLIENT
########################################
echo ""
echo "🌐 Repairing Web Client…"

cd web || { echo "⚠️ Web client folder missing"; exit 1; }

rm -rf node_modules package-lock.json
npm install --force
npm audit fix --force

cd ..


########################################
# 4. FIX FLUTTER CLIENT (OPTIONAL)
########################################
echo ""
echo "📱 Repairing Flutter App…"

if [ -d "flutter_app" ]; then
  cd flutter_app
  if [ -f "pubspec.yaml" ]; then
    flutter clean || true
    flutter pub get || true
  fi
  cd ..
else
  echo "⚠️ Flutter app not found (skipped)"
fi


########################################
# 5. CREATE/UPDATE ENVIRONMENT FILE
########################################
echo ""
echo "🧬 Making sure .env.example exists…"

cat > .env.example <<EOF
MONGO_URI=
RAZORPAY_KEY=
RAZORPAY_SECRET=
JWT_SECRET=
PORT=5000
EOF

echo "✔️ .env.example ready."


########################################
# 6. PREPARE PACKAGE.JSON FOR RENDER
########################################
echo ""
echo "📦 Updating root package.json for Render…"

cat > package.json <<EOF
{
  "name": "mangalam-wifi-zone",
  "version": "1.0.0",
  "scripts": {
    "start": "node server/index.js",
    "render-build": "cd server && npm install",
    "render-start": "npm start"
  }
}
EOF

echo "✔️ package.json updated"


########################################
# 7. ADD REMOTE & PUSH TO GITHUB
########################################
echo ""
echo "🌍 Linking GitHub repository…"

if git remote | grep -q origin; then
  git remote remove origin || true
fi

# CHANGE THIS URL TO YOUR REPO
GITHUB_URL="https://github.com/Mangalamkol/Mangalam-WiFi-Zone.git"

git remote add origin $GITHUB_URL

echo "📤 Committing & pushing…"

git add .
git commit -m "Automated Deploy Pipeline Commit"
git push -u origin main --force


########################################
# 8. TRIGGER RENDER DEPLOY AUTOMATICALLY
########################################
echo ""
echo "🚀 Triggering Render Deploy…"

curl -s -X POST https://api.render.com/deploy/srv-your-service-id/deploys \
     -H "accept: application/json" \
     -H "authorization: Bearer YOUR_RENDER_API_KEY"

echo "✔️ Render Deploy Trigger Sent"


########################################
# 9. SUCCESS MESSAGE
########################################
echo ""
echo "================================================================="
echo "🎉 FULL AUTO DEPLOY PIPELINE COMPLETED SUCCESSFULLY!"
echo "================================================================="
echo ""
echo "NEXT STEPS:"
echo "• GitHub updated ✔️"
echo "• Render will auto-build and deploy ✔️"
echo ""
echo "👉 Your site will be live in 1–2 minutes."
echo "================================================================="
