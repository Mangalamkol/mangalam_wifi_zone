import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/providers/voucher_provider.dart';
import 'package:provider/provider.dart';

class VoucherScreen extends StatelessWidget {
  const VoucherScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final voucher = Provider.of<VoucherProvider>(context).voucher;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Voucher'),
      ),
      body: voucher == null
          ? const Center(
              child: Text('No voucher purchased yet.'),
            )
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Voucher Code: ${voucher.code}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8.0),
                  Text('Status: ${voucher.status}'),
                  const SizedBox(height: 8.0),
                  Text('Expires At: ${voucher.expiresAt?.toLocal().toString() ?? 'N/A'}'),
                ],
              ),
            ),
    );
  }
}
