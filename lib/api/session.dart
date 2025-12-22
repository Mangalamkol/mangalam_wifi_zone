import 'dart:convert';
import 'package:http/http.dart' as http;

const API_BASE = "https://mangalam-wifi-zone.onrender.com";

Future<void> startSession(String mac, Map plan) async {
  final res = await http.post(
    Uri.parse("$API_BASE/api/v1/session/start"),
    headers: {"Content-Type": "application/json"},
    body: jsonEncode({"mac": mac, "plan": plan}),
  );

  if (res.statusCode != 200) {
    throw Exception('Failed to start session: ${res.body}');
  }
}
