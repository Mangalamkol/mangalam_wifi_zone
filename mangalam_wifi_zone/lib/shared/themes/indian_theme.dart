import 'package:flutter/material.dart';

class IndianTheme {
  static const Color saffron = Color(0xFFFF9933);
  static const Color white = Color(0xFFFFFFFF);
  static const Color green = Color(0xFF138808);
  static const Color navy = Color(0xFF000080);

  static ThemeData lightTheme = ThemeData(
    scaffoldBackgroundColor: white,
    primaryColor: saffron,
    appBarTheme: const AppBarTheme(
      backgroundColor: saffron,
      foregroundColor: Colors.white,
    ),
    colorScheme: ColorScheme.fromSeed(
      seedColor: green,
      primary: green,
      secondary: navy,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: green,
        foregroundColor: Colors.white,
      ),
    ),
  );
}