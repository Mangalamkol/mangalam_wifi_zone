import 'package:razorpay_flutter/razorpay_flutter.dart';

class RazorpayRuntime {
  late Razorpay _razorpay;

  RazorpayRuntime() {
    _razorpay = Razorpay();
  }

  void openCheckout({
    required int amount,
    required String description,
    required Function(String paymentId) onSuccess,
    required Function(String error) onFailure,
  }) {
    var options = {
      'key': 'RAZORPAY_KEY_FROM_ENV',
      'amount': amount * 100,
      'name': 'Mangalam WiFi Zone',
      'description': description,
      'retry': {'enabled': true, 'max_count': 1},
    };

    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS,
        (res) => onSuccess(res.paymentId!));
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR,
        (res) => onFailure(res.message ?? 'Payment failed'));

    _razorpay.open(options);
  }

  void dispose() {
    _razorpay.clear();
  }
}