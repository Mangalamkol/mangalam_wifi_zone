import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../../models/coupon.dart';

class CouponScreen extends StatefulWidget {
  final String transactionId;

  const CouponScreen({super.key, required this.transactionId});

  @override
  State<CouponScreen> createState() => _CouponScreenState();
}

class _CouponScreenState extends State<CouponScreen> {
  Future<Coupon> _fetchCoupon() async {
    final response = await http.get(Uri.parse('http://localhost:3000/api/coupons/by-transaction/${widget.transactionId}'));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      if (data['success']) {
        return Coupon.fromJson(data['coupon']);
      } else {
        throw Exception('Failed to load coupon: ${data['error']}');
      }
    } else {
      throw Exception('Failed to load coupon');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Your Coupon'),
      ),
      body: FutureBuilder<Coupon>(
        future: _fetchCoupon(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final coupon = snapshot.data!;
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Coupon Code:', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: 16.0),
                  Text(coupon.code, style: Theme.of(context).textTheme.headlineMedium),
                  const SizedBox(height: 16.0),
                  Text('Expires at: ${coupon.expiresAt}'),
                ],
              ),
            );
          } else {
            return const Center(child: Text('No coupon found'));
          }
        },
      ),
    );
  }
}
