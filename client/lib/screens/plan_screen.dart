import 'package:flutter/material.dart';
import 'dart:convert';

import '../api/api.dart';
import '../models/plan.dart';
import 'payment_screen.dart';

class PlanScreen extends StatefulWidget {
  const PlanScreen({super.key});

  @override
  _PlanScreenState createState() => _PlanScreenState();
}

class _PlanScreenState extends State<PlanScreen> {
  List<Plan> _plans = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _fetchPlans();
  }

  Future<void> _fetchPlans() async {
    try {
      final response = await Api.get('public/plans');
      if (response.statusCode == 200) {
        final List<dynamic> plansJson = json.decode(response.body);
        setState(() {
          _plans = plansJson.map((json) => Plan.fromJson(json)).toList();
          _isLoading = false;
        });
      } else {
        // Handle error
        setState(() {
          _isLoading = false;
        });
      }
    } catch (e) {
      // Handle error
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Available Plans'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : ListView.builder(
              itemCount: _plans.length,
              itemBuilder: (context, index) {
                final plan = _plans[index];
                return Card(
                  margin: EdgeInsets.all(10),
                  child: ListTile(
                    title: Text(plan.name),
                    subtitle: Text('Price: ₹${plan.price} | Validity: ${plan.validity} days | Data: ${plan.data} GB'),
                    trailing: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => PaymentScreen(plan: plan),
                          ),
                        );
                      },
                      child: Text('Buy'),
                    ),
                  ),
                );
              },
            ),
    );
  }
}
