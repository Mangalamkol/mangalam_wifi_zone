import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/screens/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MangalamWifiApp());
}

class MangalamWifiApp extends StatelessWidget {
  const MangalamWifiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}