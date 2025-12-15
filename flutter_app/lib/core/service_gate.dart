import '../coupons/coupon_entity.dart';

class ServiceGate {
  static bool allowService(CouponEntity coupon) {
    return coupon.isActive;
  }
}