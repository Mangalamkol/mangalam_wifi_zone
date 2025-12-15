import 'package:razorpay_flutter/razorpay_flutter.dart';

class RazorpayService {
  late Razorpay _razorpay;

  void init({
    required Function(Map) onSuccess,
    required Function(Map) onError,
  }) {
    _razorpay = Razorpay();
    _razorpay.on(Razorpay.EVENT_PAYMENT_SUCCESS, (PaymentSuccessResponse response) {
      onSuccess(response.asMap());
    });
    _razorpay.on(Razorpay.EVENT_PAYMENT_ERROR, (PaymentFailureResponse response) {
      onError(response.asMap());
    });
  }

  void openCheckout({
    required int amountInPaise,
    required String orderId,
    required String key,
  }) {
    final options = {
      'key': key,
      'amount': amountInPaise,
      'order_id': orderId,
      'name': 'Mangalam WiFi Zone',
      'description': 'WiFi Coupon Purchase',
      'prefill': {'contact': '', 'email': ''},
      'theme': {'color': '#138808'}, // Indian Green
    };
    _razorpay.open(options);
  }

  void dispose() => _razorpay.clear();
}
