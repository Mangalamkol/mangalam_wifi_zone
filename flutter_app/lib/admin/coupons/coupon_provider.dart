import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class CouponProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final CollectionReference _couponsCollection = _firestore.collection('coupons');

  Stream<QuerySnapshot> get couponsStream => _couponsCollection.snapshots();

  Future<void> updateCouponStatus(String code, String status) async {
    await _couponsCollection.doc(code).update({'status': status});
  }

  Future<void> revokeCoupon(String code) async {
    await _couponsCollection.doc(code).update({
      'status': 'revoked',
      'revokedByAdmin': true,
    });
  }
}
