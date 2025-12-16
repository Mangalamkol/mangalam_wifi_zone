import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../analytics/admin_analytics_provider.dart';

Future<void> disconnectSession(
    BuildContext context, String sessionId, String reason, String adminId) async {
  final sessionRef = FirebaseFirestore.instance.collection('sessions').doc(sessionId);
  await sessionRef.update({
    'forcedDisconnect': true,
  });

  final analyticsProvider =
      Provider.of<AdminAnalyticsProvider>(context, listen: false);
  analyticsProvider.recordAction(
    action: 'session_disconnected',
    adminId: adminId,
    targetId: sessionId,
    data: {'reason': reason},
  );
}
