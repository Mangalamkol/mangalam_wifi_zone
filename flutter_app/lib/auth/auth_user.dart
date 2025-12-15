import '../core/app_enums.dart';

class AuthUser {
  final String id;
  final UserRole role;

  final String? phone;     // admin or customer
  final String? couponCode; // customer only

  const AuthUser({
    required this.id,
    required this.role,
    this.phone,
    this.couponCode,
  });
}