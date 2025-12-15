class Coupon {
  final String id;
  final String code;
  final String plan;
  final DateTime expiry;
  final int deviceLimit;
  final bool isUsed;

  Coupon({required this.id, required this.code, required this.plan, required this.expiry, required this.deviceLimit, required this.isUsed});

  factory Coupon.fromJson(Map<String, dynamic> json) {
    return Coupon(
      id: json['_id'],
      code: json['code'],
      plan: json['plan'],
      expiry: DateTime.parse(json['expiry']),
      deviceLimit: json['deviceLimit'],
      isUsed: json['isUsed'],
    );
  }
}
