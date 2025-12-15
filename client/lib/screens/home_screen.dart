import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mangalam_wifi/services/theme_provider.dart';
import 'package:mangalam_wifi/services/user_provider.dart';
import 'package:mangalam_wifi/screens/login_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mangalam WiFi Zone'),
        actions: [
          IconButton(
            icon: const Icon(Icons.brightness_6),
            onPressed: () {
              Provider.of<ThemeProvider>(context, listen: false).toggleTheme();
            },
          ),
        ],
      ),
      body: Center(
        child: Consumer<UserProvider>(
          builder: (context, userProvider, child) {
            if (userProvider.user != null) {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Welcome, ${userProvider.user!.username}!'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      userProvider.clearUser();
                    },
                    child: const Text('Logout'),
                  ),
                ],
              );
            } else {
              return Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('Welcome to Mangalam WiFi Zone!'),
                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => const LoginScreen()),
                      );
                    },
                    child: const Text('Login'),
                  ),
                ],
              );
            }
          },
        ),
      ),
    );
  }
}
