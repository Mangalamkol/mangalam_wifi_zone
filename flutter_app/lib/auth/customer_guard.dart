import 'customer_auth.dart';
import 'customer_session.dart';
import '../coupons/coupon_entity.dart';

class CustomerGuard {
  static CustomerSession? createSession(CouponEntity coupon) {
    final allowed = CustomerAuth.loginWithCoupon(coupon);
    if (!allowed) return null;

    return CustomerSession(
      coupon: coupon,
      loginTime: DateTime.now(),
    );
  }
}