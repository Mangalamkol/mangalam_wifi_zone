
import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;

// ---------------------------
// PUBSPEC additions (copy into pubspec.yaml):
//
// dependencies:
//   http: ^0.13.6
//   webview_flutter: ^4.0.7
//
// (then run flutter pub get)
// ---------------------------

// Export a Routes map that you can add to MaterialApp
class NewScreensRoutes {
  static const speedTest = '/speed-test';
  static const loginOtp = '/login-otp';
  static const dashboard = '/dashboard';
  static const recharge = '/recharge';
  static const plans = '/plans';
  static const liveMedia = '/live-media';
  static const oc200 = '/oc200-login';
}

// Simple shared app bar used by all screens
PreferredSizeWidget buildAppBar(String title) {
  return AppBar(
    title: Text(title),
    centerTitle: true,
  );
}

// ---------------------------
// 1) Internet Speed Test Screen
// Basic download test: request a file and measure time. This is a simple
// approximation — production should use more robust native solutions.
// ---------------------------

class SpeedTestScreen extends StatefulWidget {
  const SpeedTestScreen({Key? key}) : super(key: key);

  @override
  State<SpeedTestScreen> createState() => _SpeedTestScreenState();
}

class _SpeedTestScreenState extends State<SpeedTestScreen> {
  double _downloadMbps = 0.0;
  bool _running = false;
  String _status = 'idle';

  Future<void> _runDownloadTest() async {
    setState(() {
      _running = true;
      _status = 'Starting...';
      _downloadMbps = 0.0;
    });

    final testUrl = Uri.parse('https://speed.hetzner.de/100MB.bin');
    // small timeout to avoid very long waits in some environments
    try {
      final sw = Stopwatch()..start();
      final resp = await http.get(testUrl).timeout(const Duration(seconds: 20));
      sw.stop();
      final bytes = resp.bodyBytes.length;
      final seconds = sw.elapsedMilliseconds / 1000.0;
      if (seconds <= 0) {
        throw Exception('time too small');
      }
      // bytes -> bits -> megabits
      final mbps = (bytes * 8) / (seconds * 1000 * 1000);
      setState(() {
        _downloadMbps = double.parse(mbps.toStringAsFixed(2));
        _status = 'Completed in ${seconds.toStringAsFixed(2)}s';
      });
    } catch (e) {
      setState(() {
        _status = 'Error: ${e.toString()}';
      });
    } finally {
      setState(() {
        _running = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('Internet Speed Test'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              'Approximate download speed (simple HTTP-based test)',
              style: TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 16),
            Center(
              child: _running
                  ? Column(children: const [CircularProgressIndicator(), SizedBox(height: 8), Text('Running...')])
                  : Text('Result: ${_downloadMbps} Mbps', style: const TextStyle(fontSize: 24)),
            ),
            const SizedBox(height: 12),
            Text('Status: $_status'),
            const Spacer(),
            ElevatedButton.icon(
              icon: const Icon(Icons.play_arrow),
              label: const Text('Run Download Test'),
              onPressed: _running ? null : _runDownloadTest,
            ),
          ],
        ),
      ),
    );
  }
}

// ---------------------------
// 2) Login / OTP screen
// Example: enter phone, request OTP (mock), verify OTP.
// In production you'd call your backend which sends OTP via SMS gateway.
// ---------------------------

class LoginOtpScreen extends StatefulWidget {
  const LoginOtpScreen({Key? key}) : super(key: key);

  @override
  State<LoginOtpScreen> createState() => _LoginOtpScreenState();
}

class _LoginOtpScreenState extends State<LoginOtpScreen> {
  final _phoneCtrl = TextEditingController();
  final _otpCtrl = TextEditingController();
  bool _otpSent = false;
  String _serverOtp = '';

  void _requestOtp() {
    // Mock: generate 6-digit OTP
    final otp = (100000 + (DateTime.now().millisecondsSinceEpoch % 900000)).toString();
    _serverOtp = otp;
    setState(() => _otpSent = true);

    // In real app: call backend to send OTP via SMS provider
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('OTP (mock) sent: $otp')));
  }

  void _verifyOtp() {
    if (_otpCtrl.text.trim() == _serverOtp) {
      // success -> navigate to dashboard
      Navigator.of(context).pushReplacementNamed(NewScreensRoutes.dashboard);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('OTP incorrect')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('Login / OTP'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(children: [
          TextField(
            controller: _phoneCtrl,
            keyboardType: TextInputType.phone,
            decoration: const InputDecoration(labelText: 'Mobile number', prefixText: '+'),
          ),
          const SizedBox(height: 12),
          ElevatedButton(onPressed: _requestOtp, child: const Text('Request OTP')),
          if (_otpSent) ...[
            const SizedBox(height: 12),
            TextField(controller: _otpCtrl, keyboardType: TextInputType.number, decoration: const InputDecoration(labelText: 'Enter OTP')),
            const SizedBox(height: 12),
            ElevatedButton(onPressed: _verifyOtp, child: const Text('Verify')),
          ]
        ]),
      ),
    );
  }
}

// ---------------------------
// 3) Dashboard screen (landing after login)
// ---------------------------

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('Dashboard'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(children: [
          Card(
            child: ListTile(
              leading: const Icon(Icons.wifi),
              title: const Text('Active Coupon'),
              subtitle: const Text('No active coupon'),
              trailing: ElevatedButton(onPressed: () => Navigator.of(context).pushNamed(NewScreensRoutes.plans), child: const Text('Buy Plan')),
            ),
          ),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(child: ElevatedButton.icon(onPressed: () => Navigator.of(context).pushNamed(NewScreensRoutes.speedTest), icon: const Icon(Icons.speed), label: const Text('Speed Test'))),
            const SizedBox(width: 8),
            Expanded(child: ElevatedButton.icon(onPressed: () => Navigator.of(context).pushNamed(NewScreensRoutes.liveMedia), icon: const Icon(Icons.play_circle), label: const Text('Live'))),
          ]),
          const SizedBox(height: 12),
          Expanded(child: Center(child: Text('Recent purchases and history will be shown here', style: TextStyle(color: Colors.grey[600])))),
        ]),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.of(context).pushNamed(NewScreensRoutes.oc200),
        child: const Icon(Icons.router),
        tooltip: 'OC200 Login',
      ),
    );
  }
}

// ---------------------------
// 4) Recharge page (enter coupon or purchase)
// A basic form to enter coupon code; in production verify at backend.
// ---------------------------

class RechargeScreen extends StatefulWidget {
  const RechargeScreen({Key? key}) : super(key: key);

  @override
  State<RechargeScreen> createState() => _RechargeScreenState();
}

class _RechargeScreenState extends State<RechargeScreen> {
  final _couponCtrl = TextEditingController();

  void _applyCoupon() {
    final code = _couponCtrl.text.trim();
    if (code.isEmpty) return;
    // In production: call server to validate coupon
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Coupon applied (mock): $code')));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('Recharge'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(children: [
          TextField(controller: _couponCtrl, decoration: const InputDecoration(labelText: 'Coupon code')),
          const SizedBox(height: 12),
          ElevatedButton(onPressed: _applyCoupon, child: const Text('Apply')),
          const SizedBox(height: 24),
          const Text('Or buy a plan from Plans page.'),
        ]),
      ),
    );
  }
}

// ---------------------------
// 5) Plan selection, payment, history
// Plans screen showing plans and placeholder for Razorpay integration
// ---------------------------

class PlansScreen extends StatelessWidget {
  const PlansScreen({Key? key}) : super(key: key);

  void _buyPlan(BuildContext context, String plan) async {
    // In production: create order on server (Razorpay) and open checkout
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Initiate payment for $plan (mock)')));
  }

  @override
  Widget build(BuildContext context) {
    final plans = [
      {'title': '1 Hour', 'price': '10'},
      {'title': '2 Hour', 'price': '18'},
      {'title': '5 Hour', 'price': '40'},
      {'title': '1 Day', 'price': '60'},
      {'title': '30 Day', 'price': '400'},
    ];

    return Scaffold(
      appBar: buildAppBar('Plans & Payment'),
      body: ListView.builder(
        padding: const EdgeInsets.all(12),
        itemCount: plans.length,
        itemBuilder: (context, i) {
          final p = plans[i];
          return Card(
            child: ListTile(
              title: Text(p['title']!),
              subtitle: Text('Price: ₹${p['price']}'),
              trailing: ElevatedButton(onPressed: () => _buyPlan(context, p['title']!), child: const Text('Buy')),
            ),
          );
        },
      ),
    );
  }
}

// ---------------------------
// 6) Live TV / Movies / OTT links
// Uses WebView to open provided YouTube links or other embeddable pages.
// Note: webview_flutter requires platform setup for iOS/Android.
// ---------------------------

class LiveMediaScreen extends StatefulWidget {
  const LiveMediaScreen({Key? key}) : super(key: key);

  @override
  State<LiveMediaScreen> createState() => _LiveMediaScreenState();
}

class _LiveMediaScreenState extends State<LiveMediaScreen> {
  final _controller = TextEditingController(text: 'https://www.youtube.com/embed/dQw4w9WgXcQ');
  late final WebViewController webCtrl;

  @override
  void initState() {
    super.initState();
    webCtrl = WebViewController()..setJavaScriptMode(JavaScriptMode.unrestricted);
  }

  void _openUrl() {
    final url = _controller.text.trim();
    if (url.isEmpty) return;
    webCtrl.loadRequest(Uri.parse(url));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('Live Media'),
      body: Column(children: [
        Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(children: [
            Expanded(child: TextField(controller: _controller, decoration: const InputDecoration(labelText: 'Embed URL'))),
            const SizedBox(width: 8),
            ElevatedButton(onPressed: _openUrl, child: const Text('Open')),
          ]),
        ),
        Expanded(child: WebViewWidget(controller: webCtrl)),
      ]),
    );
  }
}

// ---------------------------
// 7) OC200 WiFi login integration screen
// This screen takes the coupon and attempts to login via OC200 portal using
// the backend API. Here we provide a local form and POST to a backend endpoint.
// Replace the example URL with your server endpoint which calls Omada/OC200 API.
// ---------------------------

class Oc200LoginScreen extends StatefulWidget {
  const Oc200LoginScreen({Key? key}) : super(key: key);

  @override
  State<Oc200LoginScreen> createState() => _Oc200LoginScreenState();
}

class _Oc200LoginScreenState extends State<Oc200LoginScreen> {
  final _couponCtrl = TextEditingController();
  String _result = '';
  bool _loading = false;

  Future<void> _loginWithCoupon() async {
    final code = _couponCtrl.text.trim();
    if (code.isEmpty) return;
    setState(() {
      _loading = true;
      _result = '';
    });

    try {
      // Example: call your server endpoint that performs OC200 login
      final url = Uri.parse('https://your-backend.example.com/oc200/login');
      final resp = await http.post(url, headers: {'Content-Type': 'application/json'}, body: jsonEncode({'coupon': code})).timeout(const Duration(seconds: 15));
      if (resp.statusCode == 200) {
        setState(() => _result = 'Login ok (server): ${resp.body}');
      } else {
        setState(() => _result = 'Server error ${resp.statusCode}: ${resp.body}');
      }
    } catch (e) {
      setState(() => _result = 'Error: ${e.toString()}');
    } finally {
      setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar('OC200 WiFi Login'),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(children: [
          TextField(controller: _couponCtrl, decoration: const InputDecoration(labelText: 'Coupon code')),
          const SizedBox(height: 12),
          ElevatedButton(onPressed: _loading ? null : _loginWithCoupon, child: const Text('Login to WiFi')),
          const SizedBox(height: 12),
          if (_loading) const CircularProgressIndicator(),
          if (_result.isNotEmpty) Text(_result),
        ]),
      ),
    );
  }
}

// ---------------------------
// Utilities: register routes in your main.dart
// Example main.dart snippet:
/*
import 'package:flutter/material.dart';
import 'lib/screens/mangalam_new_screens.dart' as screens;

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Mangalam WiFi Zone',
      theme: ThemeData(primarySwatch: Colors.blue),
      initialRoute: screens.NewScreensRoutes.loginOtp,
      routes: {
        screens.NewScreensRoutes.loginOtp: (_) => const screens.LoginOtpScreen(),
        screens.NewScreensRoutes.dashboard: (_) => const screens.DashboardScreen(),
        screens.NewScreensRoutes.speedTest: (_) => const screens.SpeedTestScreen(),
        screens.NewScreensRoutes.recharge: (_) => const screens.RechargeScreen(),
        screens.NewScreensRoutes.plans: (_) => const screens.PlansScreen(),
        screens.NewScreensRoutes.liveMedia: (_) => const screens.LiveMediaScreen(),
        screens.NewScreensRoutes.oc200: (_) => const screens.Oc200LoginScreen(),
      },
    );
  }
}
*/

// ---------------------------
// End of file
// ---------------------------
