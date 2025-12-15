import 'package:http/http.dart' as http;
import 'dart:convert';

class Api {
  static const String baseUrl = 'http://localhost:5000/api';

  static Future<http.Response> post(String route, Map<String, dynamic> data) async {
    final response = await http.post(
      Uri.parse('$baseUrl/$route'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(data),
    );
    return response;
  }

    static Future<http.Response> get(String route) async {
    final response = await http.get(
      Uri.parse('$baseUrl/$route'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    return response;
  }
}
