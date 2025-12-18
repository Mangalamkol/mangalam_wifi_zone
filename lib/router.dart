import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/screens/coupon_screen.dart';
import 'package:mangalam_wifi_zone/screens/dashboard_screen.dart';
import 'package:mangalam_wifi_zone/screens/failure_report_screen.dart';
import 'package:mangalam_wifi_zone/screens/help_screen.dart';
import 'package:mangalam_wifi_zone/screens/plan_selection_screen.dart';
import 'package:mangalam_wifi_zone/screens/recover_coupon_screen.dart';

class AppRouter {
  static const String helpRoute = '/help';
  static const String couponRoute = '/coupon';
  static const String recoverCouponRoute = '/recover-coupon';
  static const String failureReportRoute = '/failure-report';
  static const String dashboardRoute = '/dashboard';
  static const String planSelectionRoute = '/plan-selection';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case helpRoute:
        return MaterialPageRoute(builder: (_) => const HelpScreen());
      case couponRoute:
        final couponData = settings.arguments as Map<String, dynamic>;
        return MaterialPageRoute(
          builder: (_) => CouponScreen(couponData: couponData),
        );
      case recoverCouponRoute:
        return MaterialPageRoute(builder: (_) => const RecoverCouponScreen());
      case failureReportRoute:
        final args = settings.arguments as Map<String, String>;
        return MaterialPageRoute(
          builder: (_) => FailureReportScreen(
            transactionId: args['transactionId']!,
            phone: args['phone']!,
          ),
        );
      case dashboardRoute:
        return MaterialPageRoute(builder: (_) => const DashboardScreen());
      case planSelectionRoute:
        return MaterialPageRoute(builder: (_) => const PlanSelectionScreen());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}
