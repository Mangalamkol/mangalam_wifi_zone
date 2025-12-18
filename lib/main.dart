import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:mangalam_wifi_zone/router.dart';
import 'package:mangalam_wifi_zone/screens/home_screen.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const MangalamWifiApp());
}

class MangalamWifiApp extends StatelessWidget {
  const MangalamWifiApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      onGenerateRoute: AppRouter.generateRoute,
      home: HomeScreen(),
    );
  }
}
