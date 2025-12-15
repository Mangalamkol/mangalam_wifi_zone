import 'auth_repository.dart';
import 'auth_user.dart';
import '../core/app_enums.dart';
import '../core/result.dart';

class LocalAuthRepository implements AuthRepository {
  static const _adminPhone = '9874491234';
  static const _adminPassword = 'admin@123';

  @override
  Future<AuthResponse> loginAdmin({
    required String phone,
    required String password,
  }) async {
    if (phone == _adminPhone && password == _adminPassword) {
      return Result.success(
        AuthUser(
          id: 'admin-001',
          role: UserRole.admin,
          phone: phone,
        ),
      );
    }
    return Result.failure('Invalid admin credentials');
  }

  @override
  Future<AuthResponse> loginCustomer({
    required String couponCode,
  }) async {
    if (couponCode.length >= 6) {
      return Result.success(
        AuthUser(
          id: 'cust-$couponCode',
          role: UserRole.customer,
          couponCode: couponCode,
        ),
      );
    }
    return Result.failure('Invalid coupon code');
  }

  @override
  Future<void> logout() async {}
}