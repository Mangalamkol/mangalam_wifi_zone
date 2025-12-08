import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Mangalam WiFi Zone")),
      body: Center(
        child: Text(
          "Frontend Ready!",
          style: TextStyle(fontSize: 22),
        ),
      ),
    );
  }
}
