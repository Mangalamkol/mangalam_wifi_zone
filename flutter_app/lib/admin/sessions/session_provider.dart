import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class SessionProvider with ChangeNotifier {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final CollectionReference _sessionsCollection = _firestore.collection('sessions/live');

  Stream<QuerySnapshot> get sessionsStream => _sessionsCollection.snapshots();
}
