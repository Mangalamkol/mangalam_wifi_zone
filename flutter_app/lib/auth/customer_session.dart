import '../coupons/coupon_entity.dart';

class CustomerSession {
  final CouponEntity coupon;
  final DateTime loginTime;

  CustomerSession({
    required this.coupon,
    required this.loginTime,
  });
}