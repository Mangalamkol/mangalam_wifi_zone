import '../core/coupon_state.dart';

class CouponEntity {
  final String code;
  final String planId;

  final DateTime issuedAt;
  final DateTime expiresAt;

  final int maxDevices;
  final Set<String> activeDevices;

  final CouponState state;

  const CouponEntity({
    required this.code,
    required this.planId,
    required this.issuedAt,
    required this.expiresAt,
    required this.maxDevices,
    this.activeDevices = const {},
    this.state = CouponState.active,
  });

  bool get isExpired => DateTime.now().isAfter(expiresAt);

  bool get canUse => state == CouponState.active && !isExpired;

  bool canAttachDevice(String deviceId) {
    if (!canUse) return false;
    if (activeDevices.contains(deviceId)) return true;
    return activeDevices.length < maxDevices;
  }
}