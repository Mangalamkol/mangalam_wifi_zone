import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class AuditLogProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final CollectionReference _auditLogCollection =
      _firestore.collection('admin_audit_logs');

  Stream<QuerySnapshot> get auditLogStream =>
      _auditLogCollection.orderBy('timestamp', descending: true).snapshots();

  Future<void> addAuditLog(
      String adminId, String actionType, String targetId) async {
    await _auditLogCollection.add({
      'adminId': adminId,
      'actionType': actionType,
      'targetId': targetId,
      'timestamp': FieldValue.serverTimestamp(),
    });
  }
}
