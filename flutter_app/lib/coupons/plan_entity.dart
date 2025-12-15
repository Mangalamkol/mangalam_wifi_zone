class PlanEntity {
  final String id;           // e.g. "1h_10rs"
  final String name;         // e.g. "1 Hour Unlimited"
  final Duration duration;  // e.g. Duration(hours: 1)
  final int price;           // in INR
  final int maxDevices;      // 1 or 5
  final bool isPublic;       // visible to customers

  const PlanEntity({
    required this.id,
    required this.name,
    required this.duration,
    required this.price,
    required this.maxDevices,
    this.isPublic = true,
  });
}