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
