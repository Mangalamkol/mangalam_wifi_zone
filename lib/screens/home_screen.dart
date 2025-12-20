import 'package:flutter/material.dart';

// Use a conditional import for web-specific functionality
import 'home_screen_mobile.dart' if (dart.library.html) 'home_screen_web.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: SafeArea(
        child: WebViewContainer(),
      ),
    );
  }
}
