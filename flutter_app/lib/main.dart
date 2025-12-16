import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'admin/admin_dashboard.dart';
import 'admin/coupons/coupon_management.dart';
import 'admin/sessions/session_management.dart';
import 'admin/refunds/refund_management.dart';
import 'admin/audit/audit_log_screen.dart';

void main() {
  runApp(const MyApp());
}

final _router = GoRouter(
  routes: [
    GoRoute(
      path: '/',
      builder: (context, state) => const AdminDashboard(),
      routes: [
        GoRoute(
          path: 'admin/coupons',
          builder: (context, state) => const CouponManagement(),
        ),
        GoRoute(
          path: 'admin/sessions',
          builder: (context, state) => const SessionManagement(),
        ),
        GoRoute(
          path: 'admin/refunds',
          builder: (context, state) => const RefundManagement(),
        ),
        GoRoute(
          path: 'admin/audit',
          builder: (context, state) => const AuditLogScreen(),
        ),
      ],
    ),
  ],
);

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: _router,
      title: 'Mangalam WiFi Zone',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
    );
  }
}
