
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class OC200Screen extends StatefulWidget {
  const OC200Screen({super.key});

  @override
  State<OC200Screen> createState() => _OC200ScreenState();
}

class _OC200ScreenState extends State<OC200Screen> {
  final _formKey = GlobalKey<FormState>();
  final _clientMacController = TextEditingController();
  final _apMacController = TextEditingController();
  final _ssidController = TextEditingController();
  final _voucherController = TextEditingController();
  bool _isLoading = false;
  String _message = '';

  Future<void> _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
        _message = '';
      });

      final response = await http.post(
        Uri.parse("http://localhost:5000/oc200/login"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({
          "clientMac": _clientMacController.text,
          "apMac": _apMacController.text,
          "ssid": _ssidController.text,
          "voucher": _voucherController.text,
        }),
      );

      setState(() {
        _isLoading = false;
        if (response.statusCode == 200) {
          _message = 'Login successful!';
        } else {
          _message = 'Error: ${response.body}';
        }
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('OC200 Control Panel'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _clientMacController,
                decoration: const InputDecoration(
                  labelText: 'Client MAC',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter Client MAC';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _apMacController,
                decoration: const InputDecoration(
                  labelText: 'AP MAC',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter AP MAC';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _ssidController,
                decoration: const InputDecoration(
                  labelText: 'SSID',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter SSID';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _voucherController,
                decoration: const InputDecoration(
                  labelText: 'Voucher Code',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter Voucher Code';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              if (_isLoading)
                const CircularProgressIndicator()
              else
                ElevatedButton(
                  onPressed: _handleLogin,
                  child: const Text('Login'),
                ),
              if (_message.isNotEmpty)
                Padding(
                  padding: const EdgeInsets.only(top: 16.0),
                  child: Text(
                    _message,
                    style: TextStyle(
                      color: _message.startsWith('Error') ? Colors.red : Colors.green,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
