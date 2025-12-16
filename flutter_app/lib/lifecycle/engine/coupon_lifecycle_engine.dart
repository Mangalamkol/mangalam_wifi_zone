import '../watcher/expiry_watcher.dart';
import '../policy/device_policy.dart';

class CouponLifecycleEngine {
  final ExpiryWatcher expiryWatcher;

  CouponLifecycleEngine(this.expiryWatcher);

  Future<void> onExpiry(String coupon) async {
    await expiryWatcher.expire(coupon);
  }

  Future<void> onDeviceBreach({
    required String coupon,
    required DevicePolicy policy,
    required int connectedDevices,
  }) async {
    if (policy.isBreached(connectedDevices)) {
      await expiryWatcher.expire(coupon);
    }
  }
}