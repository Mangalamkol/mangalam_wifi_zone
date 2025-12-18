import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../models/plan.dart';
import '../widgets/plan_card.dart';
import '../../checkout/screens/checkout_screen.dart';

class PlansScreen extends StatefulWidget {
  const PlansScreen({super.key});

  @override
  State<PlansScreen> createState() => _PlansScreenState();
}

class _PlansScreenState extends State<PlansScreen> {
  Future<List<Plan>> _fetchPlans() async {
    final response = await http.get(Uri.parse('http://localhost:3000/api/plans'));

    if (response.statusCode == 200) {
      List<dynamic> data = jsonDecode(response.body);
      return data.map((plan) => Plan.fromJson(plan)).toList();
    } else {
      throw Exception('Failed to load plans');
    }
  }

  void _navigateToCheckout(Plan plan) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CheckoutScreen(plan: plan),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select a Plan'),
      ),
      body: FutureBuilder<List<Plan>>(
        future: _fetchPlans(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            return ListView.builder(
              itemCount: snapshot.data!.length,
              itemBuilder: (context, index) {
                final plan = snapshot.data![index];
                return PlanCard(
                  name: plan.name,
                  price: plan.price,
                  durationMinutes: plan.durationMinutes,
                  onTap: () => _navigateToCheckout(plan),
                );
              },
            );
          } else {
            return const Center(child: Text('No plans available'));
          }
        },
      ),
    );
  }
}
