import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:mangalam_wifi_zone/models/api_response.dart';
import 'package:mangalam_wifi_zone/models/plan.dart';
import 'package:mangalam_wifi_zone/models/voucher.dart';

class ApiService {
  static const String _baseUrl = 'https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b58a96e';

  static Future<ApiResponse> fetchData() async {
    final response = await http.get(Uri.parse(_baseUrl));

    if (response.statusCode == 200) {
      return ApiResponse.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load data');
    }
  }

  static Future<Voucher> purchasePlan(Plan plan) async {
    // Simulate a network request
    await Future.delayed(const Duration(seconds: 2));

    // Simulate a successful purchase
    return Voucher(
      id: '123',
      planId: plan.id,
      code: 'WIFI123',
      isActive: true,
      deviceLimit: 1,
      usage: [],
      createdAt: DateTime.now(),
      status: 'available',
    );
  }
}
