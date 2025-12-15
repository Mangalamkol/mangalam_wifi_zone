import 'coupon_entity.dart';
import '../core/coupon_state.dart';

class CouponPolicy {
  static CouponEntity evaluate(CouponEntity coupon) {
    if (coupon.isExpired) {
      return CouponEntity(
        code: coupon.code,
        planId: coupon.planId,
        issuedAt: coupon.issuedAt,
        expiresAt: coupon.expiresAt,
        maxDevices: coupon.maxDevices,
        activeDevices: coupon.activeDevices,
        state: CouponState.expired,
      );
    }
    return coupon;
  }

  static CouponEntity attachDevice(
    CouponEntity coupon,
    String deviceId,
  ) {
    if (!coupon.canAttachDevice(deviceId)) {
      throw Exception('Device limit exceeded');
    }

    return CouponEntity(
      code: coupon.code,
      planId: coupon.planId,
      issuedAt: coupon.issuedAt,
      expiresAt: coupon.expiresAt,
      maxDevices: coupon.maxDevices,
      activeDevices: {...coupon.activeDevices, deviceId},
      state: coupon.state,
    );
  }
}