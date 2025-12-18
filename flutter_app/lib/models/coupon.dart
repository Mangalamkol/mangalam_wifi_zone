class Coupon {
  final String id;
  final String code;
  final DateTime expiresAt;
  final String status;

  Coupon({
    required this.id,
    required this.code,
    required this.expiresAt,
    required this.status,
  });

  factory Coupon.fromJson(Map<String, dynamic> json) {
    return Coupon(
      id: json['_id'],
      code: json['code'],
      expiresAt: DateTime.parse(json['expiresAt']),
      status: json['status'],
    );
  }
}
