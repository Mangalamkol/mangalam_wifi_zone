
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class Coupon {
  final String couponCode;
  final String planName;
  final DateTime activatedAt;
  final DateTime expiresAt;
  final DateTime? deactivatedAt;
  final String status;
  final int? usageDurationMinutes;

  Coupon({
    required this.couponCode,
    required this.planName,
    required this.activatedAt,
    required this.expiresAt,
    this.deactivatedAt,
    required this.status,
    this.usageDurationMinutes,
  });

  factory Coupon.fromMap(Map<String, dynamic> map) {
    return Coupon(
      couponCode: map['couponCode'],
      planName: map['planName'],
      activatedAt: DateTime.parse(map['activatedAt']),
      expiresAt: DateTime.parse(map['expiresAt']),
      deactivatedAt: map['deactivatedAt'] != null
          ? DateTime.parse(map['deactivatedAt'])
          : null,
      status: map['status'],
      usageDurationMinutes: map['usageDurationMinutes'],
    );
  }
}

class CouponScreen extends StatefulWidget {
  final Map<String, dynamic> couponData;

  const CouponScreen({super.key, required this.couponData});

  @override
  State<CouponScreen> createState() => _CouponScreenState();
}

class _CouponScreenState extends State<CouponScreen> {
  late Coupon _coupon;
  late Timer _timer;
  late Duration _remainingTime;

  @override
  void initState() {
    super.initState();
    _coupon = Coupon.fromMap(widget.couponData);
    _remainingTime = _coupon.expiresAt.difference(DateTime.now());

    if (_coupon.status == 'active') {
      _timer = Timer.periodic(const Duration(seconds: 1), (timer) {
        setState(() {
          _remainingTime = _coupon.expiresAt.difference(DateTime.now());
          if (_remainingTime.isNegative) {
            _timer.cancel();
          }
        });
      });
    }
  }

  @override
  void dispose() {
    if (mounted) {
      _timer.cancel();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Coupon'),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const SuccessHeader(),
              const SizedBox(height: 24),
              CouponCard(
                couponCode: _coupon.couponCode,
                status: _coupon.status,
              ),
              const SizedBox(height: 24),
              if (_coupon.status == 'active')
                ValidityTimer(remainingTime: _remainingTime)
              else
                const DeactivatedCard(),
              const SizedBox(height: 24),
              CouponDetails(coupon: _coupon),
              const SizedBox(height: 24),
              const InstructionsCard(),
              const SizedBox(height: 24),
              const HelpLink(),
            ],
          ),
        ),
      ),
    );
  }
}

class SuccessHeader extends StatelessWidget {
  const SuccessHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Icon(
          Icons.check_circle,
          color: Colors.green,
          size: 80,
        ),
        const SizedBox(height: 16),
        Text(
          'Payment Successful!',
          style: Theme.of(context).textTheme.headlineMedium,
        ),
        const SizedBox(height: 8),
        Text(
          'Your coupon is ready.',
          style: Theme.of(context).textTheme.titleMedium,
        ),
      ],
    );
  }
}

class CouponCard extends StatelessWidget {
  final String couponCode;
  final String status;

  const CouponCard({
    super.key,
    required this.couponCode,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'Your Coupon Code',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            CodeDisplay(couponCode: couponCode),
            const SizedBox(height: 16),
            StatusBadge(status: status),
          ],
        ),
      ),
    );
  }
}

class CodeDisplay extends StatelessWidget {
  final String couponCode;

  const CodeDisplay({
    super.key,
    required this.couponCode,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          couponCode,
          style: const TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            letterSpacing: 2,
          ),
        ),
        const SizedBox(width: 16),
        CopyButton(couponCode: couponCode),
      ],
    );
  }
}

class CopyButton extends StatelessWidget {
  final String couponCode;

  const CopyButton({
    super.key,
    required this.couponCode,
  });

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.copy),
      onPressed: () {
        Clipboard.setData(ClipboardData(text: couponCode));
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Coupon code copied!')),
        );
      },
    );
  }
}

class StatusBadge extends StatelessWidget {
  final String status;

  const StatusBadge({
    super.key,
    required this.status,
  });

  @override
  Widget build(BuildContext context) {
    Color color;
    switch (status) {
      case 'active':
        color = Colors.green;
        break;
      case 'used':
        color = Colors.blue;
        break;
      case 'expired':
        color = Colors.red;
        break;
      default:
        color = Colors.grey;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Text(
        status.toUpperCase(),
        style: const TextStyle(
          color: Colors.white,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  }
}

class ValidityTimer extends StatelessWidget {
  final Duration remainingTime;

  const ValidityTimer({
    super.key,
    required this.remainingTime,
  });

  @override
  Widget build(BuildContext context) {
    final hours = remainingTime.inHours;
    final minutes = remainingTime.inMinutes.remainder(60);
    final seconds = remainingTime.inSeconds.remainder(60);

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text(
              'Expires In',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            if (remainingTime.isNegative)
              const Text(
                'Expired',
                style: TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                  color: Colors.red,
                ),
              )
            else
              Text(
                '${hours.toString().padLeft(2, '0')}:${minutes.toString().padLeft(2, '0')}:${seconds.toString().padLeft(2, '0')}',
                style: const TextStyle(
                  fontSize: 36,
                  fontWeight: FontWeight.bold,
                ),
              ),
          ],
        ),
      ),
    );
  }
}

class DeactivatedCard extends StatelessWidget {
  const DeactivatedCard({super.key});

  @override
  Widget build(BuildContext context) {
    return const Card(
      color: Colors.grey,
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Center(
          child: Text(
            'Coupon Deactivated',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.white,
            ),
          ),
        ),
      ),
    );
  }
}

class CouponDetails extends StatelessWidget {
  final Coupon coupon;

  const CouponDetails({super.key, required this.coupon});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Coupon Details',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            DetailRow(title: 'Plan', value: coupon.planName),
            DetailRow(title: 'Activated On', value: coupon.activatedAt.toString()),
            if (coupon.deactivatedAt != null)
              DetailRow(title: 'Deactivated On', value: coupon.deactivatedAt.toString()),
            if (coupon.usageDurationMinutes != null)
              DetailRow(title: 'Usage Duration', value: '${coupon.usageDurationMinutes} minutes'),
          ],
        ),
      ),
    );
  }
}

class DetailRow extends StatelessWidget {
  final String title;
  final String value;

  const DetailRow({super.key, required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
          Text(value),
        ],
      ),
    );
  }
}

class InstructionsCard extends StatelessWidget {
  const InstructionsCard({super.key});

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'How to Use',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text('1. Connect to the Mangalam WiFi network.'),
            SizedBox(height: 4),
            Text('2. You will be prompted to enter a coupon code.'),
            SizedBox(height: 4),
            Text('3. Enter the code above to get internet access.'),
          ],
        ),
      ),
    );
  }
}

class HelpLink extends StatelessWidget {
  const HelpLink({super.key});

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: () {
        // Navigate to help screen
      },
      child: const Text('Having trouble? Get help'),
    );
  }
}
