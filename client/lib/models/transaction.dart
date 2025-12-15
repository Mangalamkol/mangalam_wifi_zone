class Transaction {
  final String id;
  final String razorpayOrderId;
  final String plan;
  final int amount;
  final String status;
  final String? razorpayPaymentId;
  final String? razorpaySignature;
  final String? coupon;

  Transaction({required this.id, required this.razorpayOrderId, required this.plan, required this.amount, required this.status, this.razorpayPaymentId, this.razorpaySignature, this.coupon});

  factory Transaction.fromJson(Map<String, dynamic> json) {
    return Transaction(
      id: json['_id'],
      razorpayOrderId: json['razorpay_order_id'],
      plan: json['plan'],
      amount: json['amount'],
      status: json['status'],
      razorpayPaymentId: json['razorpay_payment_id'],
      razorpaySignature: json['razorpay_signature'],
      coupon: json['coupon'],
    );
  }
}
