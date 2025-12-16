import 'package:cloud_firestore/cloud_firestore.dart';

class LiveAnalytics {
  final int activeSessions;
  final int totalCouponsIssued;
  final int totalCouponsExpired;
  final double todayRevenue;
  final int connectedDevices;
  final DateTime lastEventAt;

  LiveAnalytics({
    required this.activeSessions,
    required this.totalCouponsIssued,
    required this.totalCouponsExpired,
    required this.todayRevenue,
    required this.connectedDevices,
    required this.lastEventAt,
  });

  factory LiveAnalytics.fromFirestore(DocumentSnapshot doc) {
    Map<String, dynamic> data = doc.data() as Map<String, dynamic>;
    return LiveAnalytics(
      activeSessions: data['activeSessions'] ?? 0,
      totalCouponsIssued: data['totalCouponsIssued'] ?? 0,
      totalCouponsExpired: data['totalCouponsExpired'] ?? 0,
      todayRevenue: (data['todayRevenue'] ?? 0).toDouble(),
      connectedDevices: data['connectedDevices'] ?? 0,
      lastEventAt: (data['lastEventAt'] as Timestamp? ?? Timestamp.now()).toDate(),
    );
  }
}
