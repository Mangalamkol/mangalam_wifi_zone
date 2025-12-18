
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class HelpScreen extends StatefulWidget {
  const HelpScreen({super.key});

  @override
  State<HelpScreen> createState() => _HelpScreenState();
}

class _HelpScreenState extends State<HelpScreen> {
  final _formKey = GlobalKey<FormState>();
  final _transactionIdController = TextEditingController();
  final _phoneController = TextEditingController();
  bool _isLoading = false;
  Map<String, dynamic>? _couponData;
  String? _error;

  Future<void> _recoverCoupon() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _couponData = null;
        _error = null;
      });

      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));

      // Simulate API call
      final response = await _mockApiCall(
        _transactionIdController.text,
        _phoneController.text,
      );

      setState(() {
        _isLoading = false;
        if (response['status'] == 'success') {
          _couponData = response['data'];
        } else {
          _error = response['message'];
        }
      });
    }
  }

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
        title: const Text('Help & Support'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const _HeaderInfo(),
                const SizedBox(height: 24),
                _TransactionIdField(controller: _transactionIdController),
                const SizedBox(height: 16),
                _PhoneField(controller: _phoneController),
                const SizedBox(height: 24),
                _SubmitButton(
                  isLoading: _isLoading,
                  onPressed: _recoverCoupon,
                ),
                const SizedBox(height: 24),
                if (_couponData != null)
                  _ResultCard(couponData: _couponData!)
                else if (_error != null)
                  _ResultCard(error: _error!),
                const SizedBox(height: 24),
                const _SupportNote(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _HeaderInfo extends StatelessWidget {
  const _HeaderInfo();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          'Recover Your Coupon',
          style: Theme.of(context).textTheme.headlineSmall,
        ),
        const SizedBox(height: 8),
        const Text(
          'Enter your transaction details to retrieve your coupon code.',
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _TransactionIdField extends StatelessWidget {
  final TextEditingController controller;

  const _TransactionIdField({required this.controller});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
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
    );
  }
}

class _PhoneField extends StatelessWidget {
  final TextEditingController controller;

  const _PhoneField({required this.controller});

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: controller,
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
    );
  }
}

class _SubmitButton extends StatelessWidget {
  final bool isLoading;
  final VoidCallback onPressed;

  const _SubmitButton({required this.isLoading, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return isLoading
        ? const Center(child: CircularProgressIndicator())
        : ElevatedButton(
            onPressed: onPressed,
            style: ElevatedButton.styleFrom(
              minimumSize: const Size(double.infinity, 50),
            ),
            child: const Text('Find My Coupon'),
          );
  }
}

class _ResultCard extends StatelessWidget {
  final Map<String, dynamic>? couponData;
  final String? error;

  const _ResultCard({this.couponData, this.error});

  @override
  Widget build(BuildContext context) {
    if (couponData != null) {
      return Card(
        color: Colors.green.shade50,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              const Text(
                'Coupon Found!',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    couponData!['couponCode'],
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(width: 16),
                  IconButton(
                    icon: const Icon(Icons.copy),
                    onPressed: () {
                      Clipboard.setData(ClipboardData(text: couponData!['couponCode']));
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Coupon code copied!')),
                      );
                    },
                  ),
                ],
              ),
            ],
          ),
        ),
      );
    } else if (error != null) {
      return Card(
        color: Colors.red.shade50,
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, color: Colors.red),
              const SizedBox(width: 16),
              Text(error!),
            ],
          ),
        ),
      );
    } else {
      return const SizedBox.shrink();
    }
  }
}

class _SupportNote extends StatelessWidget {
  const _SupportNote();

  @override
  Widget build(BuildContext context) {
    return const Text(
      'If you are still having issues, please contact our support team at support@mangalamwifi.com',
      textAlign: TextAlign.center,
      style: TextStyle(fontSize: 12, color: Colors.grey),
    );
  }
}
