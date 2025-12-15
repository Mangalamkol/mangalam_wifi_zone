import '../core/app_enums.dart';

class CouponModel {
  final String code; // e.g. P2s6f0wT

  final String planId;
  final DateTime issuedAt;
  final DateTime expiresAt;

  final CouponStatus status;

  final int maxDevices;
  final List<String> connectedDeviceIds;

  final String? transactionId; // Razorpay / manual
  final String? customerPhone;

  const CouponModel({
    required this.code,
    required this.planId,
    required this.issuedAt,
    required this.expiresAt,
    required this.status,
    required this.maxDevices,
    required this.connectedDeviceIds,
    this.transactionId,
    this.customerPhone,
  });

  bool get isExpired => DateTime.now().isAfter(expiresAt);
}
