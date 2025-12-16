import 'dart:convert';
import 'package:flutter/foundation.dart';
import '../analytics/admin_analytics_provider.dart';

class OmadaWebhookHandler {
  final AdminAnalyticsProvider _analyticsProvider = AdminAnalyticsProvider();

  Future<void> handleEvent(String rawPayload) async {
    try {
      final payload = jsonDecode(rawPayload);
      final String voucher = payload['voucher'];
      final String event = payload['event'];

      await _analyticsProvider.recordEvent(
        voucher: voucher,
        event: event,
        time: DateTime.now(),
      );
    } catch (e) {
      if (kDebugMode) {
        print('Error handling webhook event: $e');
      }
    }
  }
}
