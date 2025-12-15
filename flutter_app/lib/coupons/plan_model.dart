import '../core/app_enums.dart';

class PlanModel {
  final String id;
  final String name;

  final int durationMinutes; // 60, 120, 1440, 43200
  final int priceINR;

  final int maxDevices; // 1 or 5
  final PlanVisibility visibility;

  const PlanModel({
    required this.id,
    required this.name,
    required this.durationMinutes,
    required this.priceINR,
    required this.maxDevices,
    required this.visibility,
  });
}
