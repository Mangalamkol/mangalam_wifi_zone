import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/router.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mangalam WiFi Zone'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, AppRouter.planSelectionRoute);
              },
              child: const Text('Buy a Plan'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, AppRouter.helpRoute);
              },
              child: const Text('Go to Help Screen'),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, AppRouter.recoverCouponRoute);
              },
              child: const Text('Recover Coupon'),
            ),
          ],
        ),
      ),
    );
  }
}
