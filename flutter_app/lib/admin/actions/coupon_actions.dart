import 'package:cloud_firestore/cloud_firestore.dart';

Future<void> revokeCoupon(String couponCode, String adminId) async {
  final couponRef = FirebaseFirestore.instance.collection('coupons').doc(couponCode);
  await couponRef.update({
    'status': 'revoked',
    'revokedByAdmin': true,
    'updatedAt': FieldValue.serverTimestamp(),
  });
}
