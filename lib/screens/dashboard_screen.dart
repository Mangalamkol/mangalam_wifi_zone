import 'dart:async';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mangalam_wifi_zone/screens/coupon_screen.dart';

class Refund {
  double amount;
  String reason;
  String status;
  String initiatedBy;
  DateTime initiatedAt;

  Refund({
    required this.amount,
    required this.reason,
    required this.status,
    required this.initiatedBy,
    required this.initiatedAt,
  });
}

// Mock data model for a coupon
class Coupon {
  String code;
  String status;
  DateTime expiryDate;
  double price;
  DateTime? deactivatedAt;
  String? deactivatedBy;
  String? reason;
  String source;
  Refund? refund;

  Coupon({
    required this.code,
    required this.status,
    required this.expiryDate,
    required this.price,
    this.deactivatedAt,
    this.deactivatedBy,
    this.reason,
    this.source = 'USER',
    this.refund,
  });
}

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  late Timer _timer;
  late String _time;

  @override
  void initState() {
    super.initState();
    _time = _formatDateTime(DateTime.now());
    _timer = Timer.periodic(const Duration(seconds: 1), (Timer t) => _getTime());
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _getTime() {
    final DateTime now = DateTime.now();
    final String formattedDateTime = _formatDateTime(now);
    setState(() {
      _time = formattedDateTime;
    });
  }

  String _formatDateTime(DateTime dateTime) {
    return DateFormat('E, d MMM yyyy HH:mm:ss').format(dateTime);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard'),
        actions: [IconButton(onPressed: () {}, icon: const Icon(Icons.logout))],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: [
              _Header(time: _time),
              const SizedBox(height: 20),
              const _KpiCards(),
              const SizedBox(height: 20),
              const _SalesAnalytics(),
              const SizedBox(height: 20),
              _CouponStatusTable(),
              const SizedBox(height: 20),
              const _CalendarAndHolidayPanel(),
              const SizedBox(height: 20),
              const _AlertsAndAdminActions(),
            ],
          ),
        ),
      ),
    );
  }
}

class _Header extends StatelessWidget {
  final String time;

  const _Header({required this.time});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'Welcome, Admin!',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        Text(
          time,
          style: const TextStyle(fontSize: 16, color: Colors.grey),
        ),
      ],
    );
  }
}

class _KpiCards extends StatelessWidget {
  const _KpiCards();

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _KpiCard(title: 'Total Sales', value: '\$12,345'),
            _KpiCard(title: 'Coupons Sold', value: '1,234'),
            _KpiCard(title: 'Active Users', value: '567'),
            _KpiCard(title: 'New Signups', value: '89'),
          ],
        ),
      ),
    );
  }
}

class _KpiCard extends StatelessWidget {
  final String title;
  final String value;

  const _KpiCard({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(title, style: const TextStyle(color: Colors.grey)),
        const SizedBox(height: 8),
        Text(value, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
      ],
    );
  }
}

class _SalesAnalytics extends StatelessWidget {
  const _SalesAnalytics();

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text('Sales Analytics', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 16),
            // Placeholder for charts
            Icon(Icons.bar_chart, size: 100, color: Colors.grey),
          ],
        ),
      ),
    );
  }
}

class _CouponStatusTable extends StatefulWidget {
  @override
  _CouponStatusTableState createState() => _CouponStatusTableState();
}

class _CouponStatusTableState extends State<_CouponStatusTable> {
  final List<Coupon> _coupons = [
    Coupon(code: 'SAVE10', status: 'Active', expiryDate: DateTime(2024, 12, 31), price: 10.0),
    Coupon(code: 'SALE20', status: 'Expired', expiryDate: DateTime(2024, 10, 31), price: 20.0),
    Coupon(code: 'FREEBIE', status: 'Active', expiryDate: DateTime(2024, 11, 30), price: 0.0),
  ];

  void _disableCoupon(Coupon coupon, String reason) {
    setState(() {
      coupon.status = 'DISABLED';
      coupon.deactivatedAt = DateTime.now();
      coupon.deactivatedBy = 'ADMIN';
      coupon.reason = reason;
    });
  }

  void _replaceCoupon(Coupon oldCoupon, int duration) {
    setState(() {
      oldCoupon.status = 'REPLACED';

      final newCoupon = Coupon(
        code: _generateCouponCode(),
        status: 'Active',
        expiryDate: DateTime.now().add(Duration(minutes: duration)),
        price: 0.0,
        source: 'ADMIN_REPLACEMENT',
      );
      _coupons.add(newCoupon);
    });
  }

  void _refundCoupon(Coupon coupon, double amount, String reason) {
    setState(() {
      coupon.status = 'REFUNDED';
      coupon.refund = Refund(
        amount: amount,
        reason: reason,
        status: 'COMPLETED',
        initiatedBy: 'ADMIN',
        initiatedAt: DateTime.now(),
      );
    });
  }

  String _generateCouponCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    final random = Random();
    return String.fromCharCodes(Iterable.generate(
        8, (_) => chars.codeUnitAt(random.nextInt(chars.length))));
  }

  Future<void> _showDisableDialog(Coupon coupon) async {
    final reasonController = TextEditingController();
    final reason = await showDialog<String>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Disable Coupon ${coupon.code}'),
        content: TextField(
          controller: reasonController,
          decoration: const InputDecoration(labelText: 'Reason for disabling'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, reasonController.text),
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Disable'),
          ),
        ],
      ),
    );

    if (reason != null && reason.isNotEmpty) {
      _disableCoupon(coupon, reason);
    }
  }

  Future<void> _showReplaceDialog(Coupon coupon) async {
    final durationController = TextEditingController();
    final duration = await showDialog<int>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Replace Coupon ${coupon.code}'),
        content: TextField(
          controller: durationController,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'New duration in minutes'),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () => Navigator.pop(context, int.tryParse(durationController.text)),
            child: const Text('Replace'),
          ),
        ],
      ),
    );

    if (duration != null && duration > 0) {
      _replaceCoupon(coupon, duration);
    }
  }

  Future<void> _showRefundDialog(Coupon coupon) async {
    final amountController = TextEditingController(text: coupon.price.toString());
    final reasonController = TextEditingController();

    final result = await showDialog<Map<String, dynamic>>(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Refund Coupon ${coupon.code}'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: amountController,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(labelText: 'Refund amount'),
            ),
            TextField(
              controller: reasonController,
              decoration: const InputDecoration(labelText: 'Reason for refund'),
            ),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () {
              final amount = double.tryParse(amountController.text);
              final reason = reasonController.text;
              if (amount != null && amount > 0 && reason.isNotEmpty) {
                Navigator.pop(context, {'amount': amount, 'reason': reason});
              }
            },
            child: const Text('Refund'),
          ),
        ],
      ),
    );

    if (result != null) {
      _refundCoupon(coupon, result['amount'], result['reason']);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            const Text('Coupon Status', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            DataTable(
              columns: const [
                DataColumn(label: Text('Coupon Code')),
                DataColumn(label: Text('Status')),
                DataColumn(label: Text('Expiry Date')),
                DataColumn(label: Text('Actions')),
              ],
              rows: _coupons.map((coupon) {
                return DataRow(cells: [
                  DataCell(Text(coupon.code)),
                  DataCell(Text(
                    coupon.status,
                    style: TextStyle(
                      color: coupon.status == 'Active'
                          ? Colors.green
                          : coupon.status == 'REPLACED'
                              ? Colors.orange
                              : coupon.status == 'REFUNDED'
                                  ? Colors.blue
                                  : Colors.red,
                    ),
                  )),
                  DataCell(Text(DateFormat('yyyy-MM-dd').format(coupon.expiryDate))),
                  DataCell(
                    coupon.status == 'Active'
                        ? Row(
                            children: [
                              ElevatedButton(
                                onPressed: () => _showDisableDialog(coupon),
                                style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                                child: const Text('Disable'),
                              ),
                              const SizedBox(width: 8),
                              ElevatedButton(
                                onPressed: () => _showReplaceDialog(coupon),
                                child: const Text('Replace'),
                              ),
                              const SizedBox(width: 8),
                              ElevatedButton(
                                onPressed: () => _showRefundDialog(coupon),
                                style: ElevatedButton.styleFrom(backgroundColor: Colors.blue),
                                child: const Text('Refund'),
                              ),
                            ],
                          )
                        : coupon.status == 'DISABLED'
                            ? Text('Reason: ${coupon.reason ?? 'N/A'}')
                            : coupon.status == 'REFUNDED'
                                ? Text('Refunded: \$${coupon.refund!.amount}')
                                : const SizedBox(),
                  ),
                ]);
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
}

class _CalendarAndHolidayPanel extends StatelessWidget {
  const _CalendarAndHolidayPanel();

  @override
  Widget build(BuildContext context) {
    return const Card(
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                children: [
                  Text('Calendar', style: TextStyle(fontWeight: FontWeight.bold)),
                  SizedBox(height: 16),
                  // Placeholder for calendar
                  Icon(Icons.calendar_today, size: 80, color: Colors.grey),
                ],
              ),
            ),
            Expanded(
              child: Column(
                children: [
                  Text('Upcoming Holidays', style: TextStyle(fontWeight: FontWeight.bold)),
                  SizedBox(height: 16),
                  Text('Diwali - Nov 1, 2024'),
                  Text('Christmas - Dec 25, 2024'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _AlertsAndAdminActions extends StatelessWidget {
  const _AlertsAndAdminActions();

  Future<void> _generateFreeCoupon(BuildContext context) async {
    final int? duration = await showDialog<int>(
      context: context,
      builder: (context) {
        final controller = TextEditingController();
        return AlertDialog(
          title: const Text('Generate Free Coupon'),
          content: TextField(
            controller: controller,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(
              labelText: 'Duration in minutes',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final minutes = int.tryParse(controller.text);
                if (minutes != null && minutes > 0) {
                  Navigator.of(context).pop(minutes);
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Please enter a valid duration')),
                  );
                }
              },
              child: const Text('Generate'),
            ),
          ],
        );
      },
    );

    if (duration != null) {
      final now = DateTime.now();
      final couponData = {
        'couponCode': _generateCouponCode(),
        'planName': '$duration Minute Plan',
        'activatedAt': now.toIso8601String(),
        'expiresAt': now.add(Duration(minutes: duration)).toIso8601String(),
        'deactivatedAt': null,
        'status': 'active',
        'usageDurationMinutes': duration,
        'source': 'ADMIN',
        'paymentStatus': 'FREE',
        'transactionId': 'ADMIN-${now.millisecondsSinceEpoch}',
      };

      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => CouponScreen(couponData: couponData),
        ),
      );
    }
  }

  String _generateCouponCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    final random = Random();
    return String.fromCharCodes(Iterable.generate(
        8, (_) => chars.codeUnitAt(random.nextInt(chars.length))));
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Alerts & Admin Actions', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 16),
            ListTile(
              leading: const Icon(Icons.warning, color: Colors.orange),
              title: const Text('High server load detected.'),
              subtitle: const Text('5 minutes ago'),
              onTap: () {},
            ),
            const Divider(),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton.icon(
                  onPressed: () => _generateFreeCoupon(context),
                  icon: const Icon(Icons.add_circle_outline),
                  label: const Text('Generate Coupon'),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.storage),
                  label: const Text('Backup Data'),
                ),
                ElevatedButton.icon(
                  onPressed: () {},
                  icon: const Icon(Icons.security),
                  label: const Text('Security Scan'),
                  style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
