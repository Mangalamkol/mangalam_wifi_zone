import 'package:flutter/material.dart';
import '../auth/customer_session.dart';

class CustomerDashboard extends StatelessWidget {
  final CustomerSession session;

  const CustomerDashboard({super.key, required this.session});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mangalam WiFi Zone'),
      ),
      body: Column(
        children: [
          Text('Coupon: ${session.coupon.code}'),
          Text('Valid till: ${session.coupon.expiresAt}'),
          const Divider(),
          const Text('Services Active'),
        ],
      ),
    );
  }
}