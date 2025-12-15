import 'package:flutter/foundation.dart';

class ErrorLogger {
  static void init() {
    FlutterError.onError = (FlutterErrorDetails details) {
      // ভবিষ্যতে Firestore / Server log
      debugPrint("APP ERROR: ${details.exception}");
    };
  }
}