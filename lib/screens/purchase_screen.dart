import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/models/plan.dart';
import 'package:mangalam_wifi_zone/providers/voucher_provider.dart';
import 'package:mangalam_wifi_zone/services/api_service.dart';
import 'package:provider/provider.dart';

class PurchaseScreen extends StatefulWidget {
  final Plan plan;

  const PurchaseScreen({super.key, required this.plan});

  @override
  State<PurchaseScreen> createState() => _PurchaseScreenState();
}

class _PurchaseScreenState extends State<PurchaseScreen> {
  bool _isPurchasing = false;

  Future<void> _purchasePlan() async {
    setState(() {
      _isPurchasing = true;
    });

    try {
      final voucher = await ApiService.purchasePlan(widget.plan);
      Provider.of<VoucherProvider>(context, listen: false).setVoucher(voucher);
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Purchase successful!'),
          backgroundColor: Colors.green,
        ),
      );
      Navigator.pop(context);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Purchase failed: $e'),
          backgroundColor: Colors.red,
        ),
      );
    } finally {
      setState(() {
        _isPurchasing = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Confirm Purchase'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Plan: ${widget.plan.name}', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8.0),
            Text('Price: ₹${widget.plan.price}'),
            const SizedBox(height: 8.0),
            Text('Validity: ${widget.plan.validity} days'),
            const SizedBox(height: 8.0),
            Text('Data: ${widget.plan.data}'),
            const SizedBox(height: 16.0),
            _isPurchasing
                ? const Center(child: CircularProgressIndicator())
                : ElevatedButton(
                    onPressed: _purchasePlan,
                    child: const Text('Confirm Purchase'),
                  ),
          ],
        ),
      ),
    );
  }
}
