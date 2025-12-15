import 'dart:math';
import 'coupon_entity.dart';
import 'plan_entity.dart';

class PlanToCoupon {
  static CouponEntity generate({
    required PlanEntity plan,
  }) {
    final now = DateTime.now();
    final code = _generateCode();

    return CouponEntity(
      code: code,
      planId: plan.id,
      issuedAt: now,
      expiresAt: now.add(plan.duration),
      maxDevices: plan.maxDevices,
    );
  }

  static String _generateCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    final rand = Random.secure();
    return List.generate(8, (_) => chars[rand.nextInt(chars.length)]).join();
  }
}