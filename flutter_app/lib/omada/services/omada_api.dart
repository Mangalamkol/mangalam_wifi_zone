import 'dart:convert';
import 'package:http/http.dart' as http;
import '../session/omada_session.dart';

class OmadaApi {
  final OmadaSession session;

  OmadaApi(this.session);

  /// 🔑 Login to OC200
  Future<void> login(String username, String password) async {
    final res = await http.post(
      Uri.parse('${session.baseUrl}/proxy/login'),
      headers: session.headers,
      body: jsonEncode({
        "username": username,
        "password": password,
      }),
    );

    if (res.statusCode != 200) {
      throw Exception('OC200 login failed');
    }

    session.cookie = res.headers['set-cookie'];
  }

  /// 🎟️ Create Voucher
  Future<void> createVoucher({
    required String code,
    required int durationMinutes,
    int maxDevices = 1,
  }) async {
    final res = await http.post(
      Uri.parse('${session.baseUrl}/proxy/network/api/v2/voucher'),
      headers: session.headers,
      body: jsonEncode({
        "name": code,
        "quota": maxDevices,
        "expireTime": durationMinutes,
      }),
    );

    if (res.statusCode != 200) {
      throw Exception('Voucher creation failed');
    }
  }

  /// ⛔ Disable Voucher
  Future<void> disableVoucher(String code) async {
    await http.post(
      Uri.parse('${session.baseUrl}/proxy/network/api/v2/voucher/disable'),
      headers: session.headers,
      body: jsonEncode({"name": code}),
    );
  }
}