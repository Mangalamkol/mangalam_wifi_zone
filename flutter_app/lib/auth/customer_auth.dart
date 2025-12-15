import '../coupons/coupon_entity.dart';
import '../core/coupon_state.dart';

class CustomerAuth {
  static bool loginWithCoupon(CouponEntity coupon) {
    if (coupon.state == CouponState.expired) return false;
    if (coupon.state == CouponState.disabled) return false;
    return true;
  }
}