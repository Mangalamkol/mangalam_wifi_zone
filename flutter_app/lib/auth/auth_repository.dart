import 'auth_result.dart';

abstract class AuthRepository {
  // Admin login
  Future<AuthResponse> loginAdmin({
    required String phone,
    required String password,
  });

  // Customer login using coupon
  Future<AuthResponse> loginCustomer({
    required String couponCode,
  });

  // Logout
  Future<void> logout();
}