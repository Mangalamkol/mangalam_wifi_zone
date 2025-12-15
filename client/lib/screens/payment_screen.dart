import 'package:flutter/material.dart';
import 'package:razorpay_flutter/razorpay_flutter.dart';
import 'dart:convert';

import '../api/api.dart';
import '../models/plan.dart';
import 'login_screen.dart';

class PaymentScreen extends StatefulWidget {
  final Plan plan;

  const PaymentScreen({super.key, required this.plan});

  @override
  _PaymentScreenState createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  late Razorpay _razorpay;
  final _contactNumberController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, _handlePaymentSuccess);
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, _handlePaymentError);
    _razorpay.on(Razorpay.EVENT_EXTERNAL_WALLET, _handleExternalWallet);
  }

  @override
  void dispose() {
    super.dispose();
    _razorpay.clear();
  }

  Future<void> _createOrder() async {
    try {
      final response = await Api.post('payment/order', {
        'planId': widget.plan.id,
        'contactNumber': _contactNumberController.text,
      });

      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        final order = data['order'];

        var options = {
          'key': 'YOUR_RAZORPAY_KEY_ID', // Replace with your key
          'amount': order['amount'],
          'name': 'Hotspot Service',
          'order_id': order['id'],
          'prefill': {
            'contact': data['contactNumber'],
            'email': 'test@example.com' // Replace with user's email if available
          }
        };

        _razorpay.open(options);
      } else {
        // Handle error
      }
    } catch (e) {
      // Handle error
    }
  }

  void _handlePaymentSuccess(PaymentSuccessResponse response) {
    // Do something when payment succeeds
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()),
    );
  }

  void _handlePaymentError(PaymentFailureResponse response) {
    // Do something when payment fails
  }

  void _handleExternalWallet(ExternalWalletResponse response) {
    // Do something when an external wallet is selected
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Complete Payment'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text('Plan: ${widget.plan.name}'),
            Text('Price: ₹${widget.plan.price}'),
            TextField(
              controller: _contactNumberController,
              decoration: InputDecoration(labelText: 'Contact Number'),
              keyboardType: TextInputType.phone,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _createOrder,
              child: Text('Pay Now'),
            ),
          ],
        ),
      ),
    );
  }
}
