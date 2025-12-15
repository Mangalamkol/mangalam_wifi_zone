import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Mangalam WiFi Zone")),
      body: const Center(
        child: Text(
          "Frontend Ready!",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}
