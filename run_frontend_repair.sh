#!/bin/bash

echo "--------------------------------------------------"
echo "     FRONTEND AUTO-FIX STARTED (Flutter + Web)"
echo "--------------------------------------------------"

FLUTTER_DIR="mangalam-wifi-zone/flutter_app"
WEB_DIR="mangalam-wifi-zone/web_client"

mkdir -p $FLUTTER_DIR/lib/screens
mkdir -p $WEB_DIR

echo "✓ Ensured Flutter + Web directories exist."

##################################################
# 1. REPAIR pubspec.yaml
##################################################

cat > $FLUTTER_DIR/pubspec.yaml << 'EOF'
name: mangalam_wifi_app
description: Mangalam WiFi Zone client app
publish_to: 'none'

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  http: ^1.2.0
  provider: ^6.1.2
  go_router: ^13.0.0
  google_fonts: ^6.2.1

flutter:
  uses-material-design: true
  assets:
    - assets/
EOF

echo "✓ pubspec.yaml repaired."

##################################################
# 2. CREATE MAIN.DART (AUTO)
##################################################

cat > $FLUTTER_DIR/lib/main.dart << 'EOF'
import 'package:flutter/material.dart';
import 'screens/home.dart';

void main() {
  runApp(const WiFiApp());
}

class WiFiApp extends StatelessWidget {
  const WiFiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}
EOF

echo "✓ main.dart created."

##################################################
# 3. CREATE HOME SCREEN FILE
##################################################

cat > $FLUTTER_DIR/lib/screens/home.dart << 'EOF'
import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Mangalam WiFi Zone")),
      body: const Center(
        child: Text("Welcome to Mangalam WiFi Zone",
            style: TextStyle(fontSize: 22)),
      ),
    );
  }
}
EOF

echo "✓ Basic HomeScreen created."

##################################################
# 4. FIX VITE WEB CLIENT
##################################################

mkdir -p $WEB_DIR

cat > $WEB_DIR/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Mangalam WiFi Zone</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/main.js"></script>
</body>
</html>
EOF

echo "✓ index.html repaired."

cat > $WEB_DIR/main.js << 'EOF'
import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>Mangalam WiFi Zone Web Client</h1>
  <p>This web version is active.</p>
`;
EOF

echo "✓ main.js created."

cat > $WEB_DIR/style.css << 'EOF'
body {
  font-family: Arial, sans-serif;
  padding: 40px;
  background: #f8f8f8;
}
EOF

echo "✓ style.css created."

cat > $WEB_DIR/vite.config.js << 'EOF'
export default {
  server: {
    port: 5173
  }
}
EOF

echo "✓ vite.config.js restored."

##################################################
# 5. INSTALL DEPENDENCIES
##################################################

echo "Running Flutter commands..."
cd $FLUTTER_DIR
flutter clean
flutter pub get

echo "Running web client npm install..."
cd ../../web_client
npm install --force

##################################################
# SCRIPT END
##################################################

echo "--------------------------------------------------"
echo " FRONTEND AUTO-FIX COMPLETED SUCCESSFULLY"
echo "--------------------------------------------------"
echo "NEXT STEPS:"
echo "  Flutter run (optional)"
echo "  npm run dev (for web client)"