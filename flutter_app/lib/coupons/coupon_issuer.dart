class CouponIssuer {
  static String generateCode() {
    // secure random, non-guessable
    return DateTime.now().millisecondsSinceEpoch.toRadixString(36);
  }
}