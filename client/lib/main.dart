import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mangalam_wifi/services/theme_provider.dart';
import 'package:mangalam_wifi/services/user_provider.dart';
import 'package:mangalam_wifi/screens/home_screen.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => UserProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          return MaterialApp(
            title: 'Mangalam WiFi Zone',
            theme: themeProvider.getTheme(),
            home: const HomeScreen(),
          );
        },
      ),
    );
  }
}
