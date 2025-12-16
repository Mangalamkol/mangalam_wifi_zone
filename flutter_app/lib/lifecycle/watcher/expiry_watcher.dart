import '../../omada/services/omada_api.dart';

class ExpiryWatcher {
  final OmadaApi omada;

  ExpiryWatcher(this.omada);

  Future<void> expire(String couponCode) async {
    await omada.disableVoucher(couponCode);
  }
}