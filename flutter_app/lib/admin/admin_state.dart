import '../coupons/coupon_entity.dart';

class AdminState {
  final List<CouponEntity> issuedCoupons;

  AdminState({
    this.issuedCoupons = const [],
  });

  AdminState copyWith({
    List<CouponEntity>? issuedCoupons,
  }) {
    return AdminState(
      issuedCoupons: issuedCoupons ?? this.issuedCoupons,
    );
  }
}