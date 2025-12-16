import '../../analytics/admin_analytics_provider.dart';

Future<void> disconnectDevice(
  AdminAnalyticsProvider analyticsProvider,
  String adminId,
  String deviceId,
) async {
  await analyticsProvider.recordAction(
    action: 'disconnect_client',
    adminId: adminId,
    targetId: deviceId,
  );
}
