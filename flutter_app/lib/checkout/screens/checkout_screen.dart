import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../../models/plan.dart';
import '../../coupon/screens/coupon_screen.dart';

class CheckoutScreen extends StatefulWidget {
  final Plan plan;

  const CheckoutScreen({super.key, required this.plan});

  @override
  State<CheckoutScreen> createState() => _CheckoutScreenState();
}

class _CheckoutScreenState extends State<CheckoutScreen> {
  bool _isLoading = false;
  String? _error;
  String? _transactionId;

  Future<void> _checkout() async {
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final response = await http.post(
        Uri.parse('http://localhost:3000/api/coupons/checkout'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'planId': widget.plan.id}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['success']) {
          setState(() {
            _transactionId = data['transactionId'];
            _isLoading = false;
          });
          Navigator.pushReplacement(
            context,
            MaterialPageRoute(
              builder: (context) => CouponScreen(transactionId: _transactionId!),
            ),
          );
        } else {
          setState(() {
            _error = data['error'];
            _isLoading = false;
          });
        }
      } else {
        setState(() {
          _error = 'An unexpected error occurred.';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Checkout'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              'Selected Plan: ${widget.plan.name}',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 16.0),
            Text('Price: ₹${widget.plan.price}'),
            Text('Duration: ${widget.plan.durationMinutes} minutes'),
            const SizedBox(height: 32.0),
            if (_isLoading)
              const Center(child: CircularProgressIndicator())
            else
              ElevatedButton(
                onPressed: _checkout,
                child: const Text('Pay'),
              ),
            if (_error != null)
              Padding(
                padding: const EdgeInsets.only(top: 16.0),
                child: Text(
                  _error!,
                  style: const TextStyle(color: Colors.red),
                  textAlign: TextAlign.center,
                ),
              ),
          ],
        ),
      ),
    );
  }
}
