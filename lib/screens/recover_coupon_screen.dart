
import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/router.dart';

class RecoverCouponScreen extends StatefulWidget {
  const RecoverCouponScreen({super.key});

  @override
  State<RecoverCouponScreen> createState() => _RecoverCouponScreenState();
}

class _RecoverCouponScreenState extends State<RecoverCouponScreen> {
  final _formKey = GlobalKey<FormState>();
  final _transactionIdController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _isLoading = false;
  bool _showReportButton = false;

  Future<void> _recoverCoupon() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _showReportButton = false;
      });

      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));

      // Simulate API call to POST /api/help/recover
      final response = await _mockApiCall(
        _transactionIdController.text,
        _phoneController.text,
      );

      setState(() {
        _isLoading = false;
      });

      if (response['status'] == 'success') {
        Navigator.pushReplacementNamed(
          context,
          AppRouter.couponRoute,
          arguments: response['data'],
        );
      } else {
        setState(() {
          _showReportButton = true;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(response['message'])),
        );
      }
    }
  }

  // Mock API call to simulate the backend
  Future<Map<String, dynamic>> _mockApiCall(
      String transactionId, String phone) async {
    if (transactionId == 'success' && phone == '9876543210') {
      return {
        'status': 'success',
        'data': {
          'couponCode': 'U56wRZ5n',
          'planName': '1 Hour',
          'activatedAt': '2025-01-15T10:12:00Z',
          'expiresAt': '2025-01-15T11:12:00Z',
          'status': 'active'
        }
      };
    } else {
      return {'status': 'error', 'message': 'Coupon not found'};
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recover Coupon'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _transactionIdController,
                decoration: const InputDecoration(
                  labelText: 'Transaction ID',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your transaction ID';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _phoneController,
                decoration: const InputDecoration(
                  labelText: 'Phone Number',
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.phone,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your phone number';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 24),
              if (_isLoading)
                const CircularProgressIndicator()
              else
                ElevatedButton(
                  onPressed: _recoverCoupon,
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size(double.infinity, 50),
                  ),
                  child: const Text('Recover Coupon'),
                ),
              if (_showReportButton)
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: TextButton(
                    onPressed: () {
                      Navigator.pushNamed(
                        context,
                        AppRouter.failureReportRoute,
                        arguments: {
                          'transactionId': _transactionIdController.text,
                          'phone': _phoneController.text,
                        },
                      );
                    },
                    child: const Text('Having trouble? Report an issue'),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
