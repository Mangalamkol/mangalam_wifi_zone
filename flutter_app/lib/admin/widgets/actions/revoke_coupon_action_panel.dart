import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../analytics/admin_analytics_provider.dart';
import '../../actions/coupon_actions.dart';

class RevokeCouponActionPanel extends StatefulWidget {
  final String adminId;

  const RevokeCouponActionPanel({super.key, required this.adminId});

  @override
  _RevokeCouponActionPanelState createState() =>
      _RevokeCouponActionPanelState();
}

class _RevokeCouponActionPanelState extends State<RevokeCouponActionPanel> {
  final _couponCodeController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _couponCodeController,
            decoration: const InputDecoration(
              labelText: 'Coupon Code',
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              final couponCode = _couponCodeController.text;
              if (couponCode.isNotEmpty) {
                final analyticsProvider = context.read<AdminAnalyticsProvider>();
                revokeCoupon(couponCode, widget.adminId);
                analyticsProvider.recordAction(
                  action: 'revoke_coupon',
                  adminId: widget.adminId,
                  targetId: couponCode,
                );
                Navigator.of(context).pop();
              }
            },
            child: const Text('Revoke Coupon'),
          ),
        ],
      ),
    );
  }
}
