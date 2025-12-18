
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/screens/coupon_screen.dart';

class Plan {
  final String name;
  final int hours;
  final int price;
  final int devices;

  const Plan({
    required this.name,
    required this.hours,
    required this.price,
    required this.devices,
  });
}

class PlanSelectionScreen extends StatelessWidget {
  const PlanSelectionScreen({super.key});

  static const List<Plan> _plans = [
    Plan(name: '1 Hour Unlimited', hours: 1, price: 10, devices: 1),
    Plan(name: '2 Hours Unlimited', hours: 2, price: 20, devices: 1),
    Plan(name: '5 Hours Unlimited', hours: 5, price: 30, devices: 1),
    Plan(name: '24 Hours Unlimited', hours: 24, price: 50, devices: 1),
    Plan(name: '30 Days Unlimited', hours: 24 * 30, price: 100, devices: 1),
    Plan(name: '30 Days Unlimited', hours: 24 * 30, price: 300, devices: 5),
  ];

  String _generateCouponCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    final random = Random();
    return String.fromCharCodes(Iterable.generate(
        8, (_) => chars.codeUnitAt(random.nextInt(chars.length))));
  }

  Future<void> _selectPlan(BuildContext context, Plan plan) async {
    // Simulate a payment process
    await showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Confirm Payment'),
        content: Text('You are about to purchase the ${plan.name} for ₹${plan.price}.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context, true);
            },
            child: const Text('Pay'),
          ),
        ],
      ),
    ).then((paymentSuccessful) {
      if (paymentSuccessful == true) {
        final now = DateTime.now();
        final couponData = {
          'couponCode': _generateCouponCode(),
          'planName': plan.name,
          'activatedAt': now.toIso8601String(),
          'expiresAt': now.add(Duration(hours: plan.hours)).toIso8601String(),
          'status': 'active',
          'usageDurationMinutes': plan.hours * 60,
          'source': 'USER',
          'paymentStatus': 'PAID',
          'transactionId': 'TXN-${now.millisecondsSinceEpoch}',
        };

        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (_) => CouponScreen(couponData: couponData),
          ),
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select a Plan'),
      ),
      body: ListView.builder(
        itemCount: _plans.length,
        itemBuilder: (context, index) {
          final plan = _plans[index];
          return Card(
            margin: const EdgeInsets.all(8.0),
            child: ListTile(
              title: Text(plan.name, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text('${plan.devices} Device${plan.devices > 1 ? 's' : ''}'),
              trailing: Text('₹${plan.price}', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              onTap: () => _selectPlan(context, plan),
            ),
          );
        },
      ),
    );
  }
}
