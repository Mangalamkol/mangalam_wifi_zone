import 'package:mangalam_wifi_zone/models/plan.dart';

class ApiResponse {
  final List<Plan> plans;

  ApiResponse({required this.plans});

  factory ApiResponse.fromJson(Map<String, dynamic> json) {
    return ApiResponse(
      plans: (json['plans'] as List).map((plan) => Plan.fromJson(plan)).toList(),
    );
  }
}
