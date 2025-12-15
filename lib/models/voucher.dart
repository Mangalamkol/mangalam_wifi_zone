class Voucher {
  final String id;
  final String planId;
  final String code;
  final bool isActive;
  final String? assignedTo;
  final DateTime? expiresAt;
  final int deviceLimit;
  final List<dynamic> usage;
  final DateTime createdAt;
  final String status;

  Voucher({
    required this.id,
    required this.planId,
    required this.code,
    required this.isActive,
    this.assignedTo,
    this.expiresAt,
    required this.deviceLimit,
    required this.usage,
    required this.createdAt,
    required this.status,
  });

  factory Voucher.fromJson(Map<String, dynamic> json) {
    return Voucher(
      id: json['_id'],
      planId: json['planId'],
      code: json['code'],
      isActive: json['isActive'],
      assignedTo: json['assignedTo'],
      expiresAt: json['expiresAt'] != null ? DateTime.parse(json['expiresAt']) : null,
      deviceLimit: json['deviceLimit'],
      usage: json['usage'],
      createdAt: DateTime.parse(json['createdAt']),
      status: json['status'],
    );
  }
}
