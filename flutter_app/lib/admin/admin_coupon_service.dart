import '../coupons/plan_entity.dart';
import '../coupons/plan_to_coupon.dart';
import '../coupons/coupon_entity.dart';

class AdminCouponService {
  static CouponEntity issueCoupon({
    required PlanEntity plan,
    String? remark,
  }) {
    final coupon = PlanToCoupon.generate(plan: plan);

    // future hooks:
    // 1. OC200 voucher create
    // 2. WhatsApp send
    // 3. Firebase log

    return coupon;
  }
}