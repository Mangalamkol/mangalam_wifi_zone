import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'vouchers_screen.dart';

class OC200Screen extends StatefulWidget {
  const OC200Screen({super.key});

  @override
  State<OC200Screen> createState() => _OC200ScreenState();
}

class _OC200ScreenState extends State<OC200Screen> {
  final _formKey = GlobalKey<FormState>();
  String _ipAddress = '192.168.0.233'; // Default for convenience
  String _username = '';
  String _password = '';
  bool _isLoading = false;
  String _status = '';
  String? _token;

  Future<void> _login() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();
      setState(() {
        _isLoading = true;
        _status = 'Logging in...';
      });

      final Uri url = Uri.parse('https://$_ipAddress/api/v2/login');

      try {
        // This is a simplified and potentially insecure way to handle SSL verification.
        // In a production app, you would use a proper HttpClient that trusts the self-signed certificate.
        final response = await http.post(
          url,
          headers: {'Content-Type': 'application/json; charset=UTF-8'},
          body: jsonEncode(<String, String>{
            'username': _username,
            'password': _password,
          }),
        );

        final responseBody = jsonDecode(response.body);

        if (response.statusCode == 200 && responseBody['errorCode'] == 0) {
          setState(() {
            _status = 'Login successful!';
            _token = responseBody['result']['token'];
            _isLoading = false;
          });
          if (!mounted) return;
          // Navigate to the next screen on successful login
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => VouchersScreen(ipAddress: _ipAddress, token: _token!),
            ),
          );
        } else {
          setState(() {
            _status = 'Login failed: ${responseBody['msg'] ?? 'Unknown error'}';
            _isLoading = false;
          });
        }
      } catch (e) {
        setState(() {
          _status = 'Error: ${e.toString()}';
          _isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('OC200 Login'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                initialValue: _ipAddress,
                decoration: const InputDecoration(
                  labelText: 'Controller IP Address',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the IP address';
                  }
                  return null;
                },
                onSaved: (value) => _ipAddress = value!,
              ),
              const SizedBox(height: 16),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Username',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the username';
                  }
                  return null;
                },
                onSaved: (value) => _username = value!,
              ),
              const SizedBox(height: 16),
              TextFormField(
                decoration: const InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(),
                ),
                obscureText: true,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the password';
                  }
                  return null;
                },
                onSaved: (value) => _password = value!,
              ),
              const SizedBox(height: 24),
              _isLoading
                  ? const CircularProgressIndicator()
                  : ElevatedButton(
                      onPressed: _login,
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 15),
                        textStyle: const TextStyle(fontSize: 16),
                      ),
                      child: const Text('Login'),
                    ),
              const SizedBox(height: 20),
              if (_status.isNotEmpty)
                Text(
                  _status,
                  style: TextStyle(
                    color: _token != null ? Colors.green : Colors.red,
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}
