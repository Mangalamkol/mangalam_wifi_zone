import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'refund_provider.dart';

class RefundManagement extends StatelessWidget {
  const RefundManagement({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => RefundProvider(),
      child: const RefundManagementBody(),
    );
  }
}

class RefundManagementBody extends StatelessWidget {
  const RefundManagementBody({super.key});

  @override
  Widget build(BuildContext context) {
    final refundProvider = context.watch<RefundProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Refund Management'),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: refundProvider.paymentsStream,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('Something went wrong'));
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final payments = snapshot.data!.docs;

          return ListView.builder(
            itemCount: payments.length,
            itemBuilder: (context, index) {
              final payment = payments[index];
              final paymentData = payment.data() as Map<String, dynamic>;

              final txnId = payment.id;
              final refundStatus = paymentData['refundStatus'] ?? 'none';
              final refundReason = paymentData['refundReason'] ?? '';

              return ListTile(
                title: const Text('Transaction ID: \$txnId'),
                subtitle: const Text('Status: \$refundStatus\nReason: \$refundReason'),
                trailing: refundStatus == 'requested'
                    ? ElevatedButton(
                        onPressed: () => refundProvider.processRefund(txnId),
                        child: const Text('Process Refund'),
                      )
                    : null,
                onTap: () => _showRefundDialog(context, txnId),
              );
            },
          );
        },
      ),
    );
  }

  Future<void> _showRefundDialog(BuildContext context, String txnId) {
    final reasonController = TextEditingController();
    final refundProvider = context.read<RefundProvider>();

    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Request Refund'),
          content: TextField(
            controller: reasonController,
            decoration: const InputDecoration(
              labelText: 'Reason for refund',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                refundProvider.requestRefund(txnId, reasonController.text);
                Navigator.of(context).pop();
              },
              child: const Text('Request'),
            ),
          ],
        );
      },
    );
  }
}
