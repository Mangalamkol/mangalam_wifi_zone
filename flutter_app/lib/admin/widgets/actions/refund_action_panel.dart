import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../analytics/admin_analytics_provider.dart';
import '../../actions/refund_actions.dart';

class RefundActionPanel extends StatefulWidget {
  final String adminId;

  const RefundActionPanel({super.key, required this.adminId});

  @override
  _RefundActionPanelState createState() => _RefundActionPanelState();
}

class _RefundActionPanelState extends State<RefundActionPanel> {
  final _amountController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _amountController,
            decoration: const InputDecoration(
              labelText: 'Amount',
            ),
            keyboardType: const TextInputType.numberWithOptions(decimal: true),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              final amount = double.tryParse(_amountController.text);
              if (amount != null) {
                final analyticsProvider = context.read<AdminAnalyticsProvider>();
                issueRefund(
                  analyticsProvider,
                  widget.adminId,
                  amount,
                );
                Navigator.of(context).pop();
              }
            },
            child: const Text('Issue Refund'),
          ),
        ],
      ),
    );
  }
}
