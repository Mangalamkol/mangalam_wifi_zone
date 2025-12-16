import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class RefundProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final CollectionReference _paymentsCollection =
      _firestore.collection('payments');

  Stream<QuerySnapshot> get paymentsStream => _paymentsCollection.snapshots();

  Future<void> requestRefund(String txnId, String reason) async {
    await _paymentsCollection.doc(txnId).update({
      'refundStatus': 'requested',
      'refundReason': reason,
    });
  }

  Future<void> processRefund(String txnId) async {
    await _paymentsCollection.doc(txnId).update({
      'refundStatus': 'processed',
    });
  }
}
