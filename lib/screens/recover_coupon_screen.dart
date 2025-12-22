
import 'package:flutter/material.dart';

class RecoverCouponScreen extends StatefulWidget {
  const RecoverCouponScreen({super.key});

  @override
  State<RecoverCouponScreen> createState() => _RecoverCouponScreenState();
}

class _RecoverCouponScreenState extends State<RecoverCouponScreen> {
  final _phoneController = TextEditingController();
  final _otpController = TextEditingController();

  String? _coupon;
  bool _otpSent = false;

  void _sendOtp() {
    // TODO: Implement OTP sending logic
    setState(() {
      _otpSent = true;
    });
  }

  void _verifyOtp() {
    // TODO: Implement OTP verification and coupon recovery logic
    setState(() {
      _coupon = 'YOUR_COUPON_CODE';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recover Coupon'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            if (_coupon == null) ...[
              if (!_otpSent) ...[
                TextField(
                  controller: _phoneController,
                  decoration: const InputDecoration(
                    labelText: 'Phone Number',
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _sendOtp,
                  child: const Text('Send OTP'),
                ),
              ] else ...[
                TextField(
                  controller: _otpController,
                  decoration: const InputDecoration(
                    labelText: 'OTP',
                  ),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _verifyOtp,
                  child: const Text('Verify OTP'),
                ),
              ],
            ] else ...[
              Text('Your coupon is: $_coupon'),
            ],
          ],
        ),
      ),
    );
  }
}
