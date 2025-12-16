import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'live_analytics.dart';

class AdminAnalyticsProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final DocumentReference _liveAnalyticsRef =
      _firestore.collection('analytics').doc('live');

  Stream<LiveAnalytics> get liveAnalytics {
    return _liveAnalyticsRef
        .snapshots()
        .map((snapshot) => LiveAnalytics.fromFirestore(snapshot));
  }

  Future<void> recordAction({
    required String action,
    required String adminId,
    String? targetId,
    Map<String, dynamic>? data,
  }) async {
    final Map<String, dynamic> updates = {
      'lastEventAt': FieldValue.serverTimestamp(),
    };

    Map<String, dynamic>? eventData = data;

    switch (action) {
      case 'issue_coupon':
        updates['totalCouponsIssued'] = FieldValue.increment(1);
        break;
      case 'expire_coupon':
        updates['totalCouponsExpired'] = FieldValue.increment(1);
        break;
      case 'connect_client':
        updates['connectedDevices'] = FieldValue.increment(1);
        updates['activeSessions'] = FieldValue.increment(1);
        break;
      case 'disconnect_client':
        updates['connectedDevices'] = FieldValue.increment(-1);
        updates['activeSessions'] = FieldValue.increment(-1);
        break;
      case 'session_disconnected':
        updates['activeSessions'] = FieldValue.increment(-1);
        if (targetId != null) {
          try {
            final sessionDoc =
                await _firestore.collection('sessions').doc(targetId).get();
            if (sessionDoc.exists) {
              eventData = {
                ...?data,
                'macAddress': sessionDoc.data()?['macAddress'],
                'couponCode': sessionDoc.data()?['couponCode'],
              };
            }
          } catch (e) {
            // Ignore if session can't be fetched
          }
        }
        break;
      case 'receive_payment':
        if (data != null && data['amount'] is num) {
          updates['todayRevenue'] =
              FieldValue.increment((data['amount'] as num).toDouble());
        }
        break;
      case 'issue_refund':
        if (data != null && data['amount'] is num) {
          updates['todayRevenue'] =
              FieldValue.increment(-(data['amount'] as num).toDouble());
        }
        break;
    }

    if (updates.length > 1) {
      await _liveAnalyticsRef.set(updates, SetOptions(merge: true));
    }

    await _logAction(adminId, action, targetId, eventData);
  }

  Future<void> _logAction(
      String adminId, String actionType, String? targetId, Map<String, dynamic>? data) async {
    await _firestore.collection('auditLog').add({
      'adminId': adminId,
      'actionType': actionType,
      'targetId': targetId,
      'data': data,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}
