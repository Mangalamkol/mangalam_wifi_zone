
class Plan {
  final String id;
  final String name;
  final int durationMinutes;
  final int price;
  final int deviceLimit;
  final int codeLength;
  final bool isActive;
  final DateTime createdAt;

  Plan({
    required this.id,
    required this.name,
    required this.durationMinutes,
    required this.price,
    required this.deviceLimit,
    required this.codeLength,
    required this.isActive,
    required this.createdAt,
  });

  factory Plan.fromJson(Map<String, dynamic> json) {
    return Plan(
      id: json['_id'],
      name: json['name'],
      durationMinutes: json['durationMinutes'],
      price: json['price'],
      deviceLimit: json['deviceLimit'],
      codeLength: json['codeLength'],
      isActive: json['isActive'],
      createdAt: DateTime.parse(json['createdAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'durationMinutes': durationMinutes,
      'price': price,
      'deviceLimit': deviceLimit,
      'codeLength': codeLength,
      'isActive': isActive,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
