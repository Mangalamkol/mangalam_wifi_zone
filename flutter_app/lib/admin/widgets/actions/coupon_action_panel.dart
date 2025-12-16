import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../analytics/admin_analytics_provider.dart';

class CouponActionPanel extends StatefulWidget {
  final String adminId;

  const CouponActionPanel({super.key, required this.adminId});

  @override
  _CouponActionPanelState createState() => _CouponActionPanelState();
}

class _CouponActionPanelState extends State<CouponActionPanel> {
  final _voucherController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _voucherController,
            decoration: const InputDecoration(
              labelText: 'Voucher Code',
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              final analyticsProvider = context.read<AdminAnalyticsProvider>();
              issueCoupon(
                analyticsProvider,
                widget.adminId,
                _voucherController.text,
              );
              Navigator.of(context).pop();
            },
            child: const Text('Issue Coupon'),
          ),
        ],
      ),
    );
  }
}
