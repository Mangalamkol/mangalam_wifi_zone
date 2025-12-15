import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:url_launcher/url_launcher.dart';

class Oc200LoginScreen extends StatefulWidget {
  final String? entryUrl; // optional: the captive-portal entry URL passed from OS/browser
  final String apiBase; // e.g. https://api.mangalam.example
  const Oc200LoginScreen({super.key, this.entryUrl, required this.apiBase});

  @override
  State<Oc200LoginScreen> createState() => _Oc200LoginScreenState();
}

class _Oc200LoginScreenState extends State<Oc200LoginScreen> {
  final _voucherCtrl = TextEditingController();
  final _urlCtrl = TextEditingController();
  String? clientMac, apMac, ssid, redirectUrl, rid;
  bool _loading = false;
  String _message = '';

  @override
  void initState() {
    super.initState();
    if (widget.entryUrl != null) {
      _urlCtrl.text = widget.entryUrl!;
      _parseEntry(widget.entryUrl!);
    }
  }

  void _parseEntry(String url) {
    try {
      final u = Uri.parse(url);
      final qp = u.queryParameters;
      clientMac = qp['cid'] ?? qp['clientMac'];
      apMac = qp['ap'] ?? qp['apMac'];
      ssid = qp['ssid'] != null ? Uri.decodeComponent(qp['ssid']!) : qp['ssid'];
      redirectUrl = qp['u'] != null ? Uri.decodeComponent(qp['u']!) : qp['u'];
      rid = qp['rid'];
      setState((){});
    } catch (e) {
      setState(()=> _message = 'Invalid entry URL');
    }
  }

  Future<void> _login() async {
    final voucher = _voucherCtrl.text.trim();
    if (voucher.isEmpty) return setState(()=> _message = "Enter voucher");
    if (clientMac == null || apMac == null) return setState(()=> _message = "Missing client/ap MAC");

    setState(() { _loading = true; _message = ''; });
    final url = Uri.parse('${widget.apiBase}/oc200/login');
    try {
      final resp = await http.post(url,
        headers: {'Content-Type':'application/json'},
        body: jsonEncode({
          'clientMac': clientMac,
          'apMac': apMac,
          'ssid': ssid,
          'voucher': voucher,
        }),
      ).timeout(const Duration(seconds: 10));

      final body = jsonDecode(resp.body);
      if (resp.statusCode == 200 && body['success'] == true) {
        setState(()=> _message = 'Login successful!');
        if (redirectUrl != null && redirectUrl!.isNotEmpty) {
          // redirect user (open system browser)
          if (await canLaunch(redirectUrl!)) {
            await launch(redirectUrl!);
          }
        }
      } else {
        setState(()=> _message = 'Login failed: ${body['error'] ?? body['oc200']?.toString() ?? resp.body}');
      }
    } catch (e) {
      setState(()=> _message = 'Error: $e');
    } finally {
      setState(()=> _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("OC200 Voucher Login")),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(children: [
          TextField(
            controller: _urlCtrl,
            decoration: const InputDecoration(labelText: "Captive entry URL (optional)"),
            onSubmitted: (v) => _parseEntry(v),
          ),
          const SizedBox(height: 8),
          Row(children: [
            Expanded(child: Text("Client MAC: ${clientMac ?? '-'}")),
            const SizedBox(width: 8),
            Text("AP MAC: ${apMac ?? '-'}"),
          ]),
          const SizedBox(height: 8),
          TextField(
            controller: _voucherCtrl,
            decoration: const InputDecoration(labelText: "Voucher code"),
          ),
          const SizedBox(height: 12),
          ElevatedButton(
            onPressed: _loading ? null : _login,
            child: _loading ? const CircularProgressIndicator(color: Colors.white) : const Text("Login")
          ),
          const SizedBox(height: 12),
          Text(_message, style: const TextStyle(color: Colors.red)),
        ]),
      ),
    );
  }
}