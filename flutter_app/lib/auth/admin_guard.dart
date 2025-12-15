class AdminGuard {
  static const String adminPhone = '9874491234';
  static String adminPassword = 'admin@123'; // changeable later

  static bool validate({
    required String phone,
    required String password,
  }) {
    return phone == adminPhone && password == adminPassword;
  }

  static void updatePassword(String newPassword) {
    adminPassword = newPassword;
  }
}