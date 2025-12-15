import 'package:flutter/material.dart';
import 'shared/themes/indian_theme.dart';

void main() {
  runApp(const MangalamApp());
}

class MangalamApp extends StatelessWidget {
  const MangalamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mangalam WiFi Zone',
      debugShowCheckedModeBanner: false,
      theme: IndianTheme.lightTheme,
      home: const Placeholder(), // পরবর্তী ধাপে replace হবে
    );
  }
}