import '../../analytics/admin_analytics_provider.dart';

Future<void> issueRefund(
  AdminAnalyticsProvider analyticsProvider,
  String adminId,
  double amount,
) async {
  await analyticsProvider.recordAction(
    action: 'issue_refund',
    adminId: adminId,
    data: {'amount': amount},
  );
}
