import '../omada/services/omada_api.dart';

class CouponIssuer {
  final OmadaApi omada;

  CouponIssuer(this.omada);

  Future<void> issueToOC200({
    required String coupon,
    required int minutes,
    required int devices,
  }) async {
    await omada.createVoucher(
      code: coupon,
      durationMinutes: minutes,
      maxDevices: devices,
    );
  }
}