import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../analytics/admin_analytics_provider.dart';
import '../analytics/live_analytics.dart';
import 'widgets/kpi_card.dart';
import 'widgets/charts/usage_line_chart.dart';
import 'widgets/actions/coupon_action_panel.dart';
import 'widgets/actions/device_action_panel.dart';
import 'widgets/actions/refund_action_panel.dart';
import 'widgets/actions/revoke_coupon_action_panel.dart';
import 'widgets/actions/disconnect_session_action_panel.dart';

class AdminDashboard extends StatelessWidget {
  const AdminDashboard({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AdminAnalyticsProvider(),
      child: const AdminDashboardBody(),
    );
  }
}

class AdminDashboardBody extends StatefulWidget {
  const AdminDashboardBody({super.key});

  @override
  _AdminDashboardBodyState createState() => _AdminDashboardBodyState();
}

class _AdminDashboardBodyState extends State<AdminDashboardBody> {
  void _showActionPanel(BuildContext context, Widget panel) {
    showModalBottomSheet(
      context: context,
      builder: (_) => panel,
    );
  }

  @override
  Widget build(BuildContext context) {
    final analyticsProvider = context.watch<AdminAnalyticsProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.confirmation_number),
            onPressed: () => context.go('/admin/coupons'),
          ),
          IconButton(
            icon: const Icon(Icons.network_check),
            onPressed: () => context.go('/admin/sessions'),
          ),
          IconButton(
            icon: const Icon(Icons.money_off),
            onPressed: () => context.go('/admin/refunds'),
          ),
          IconButton(
            icon: const Icon(Icons.history),
            onPressed: () => context.go('/admin/audit'),
          ),
        ],
      ),
      body: StreamProvider<LiveAnalytics>.value(
        value: analyticsProvider.liveAnalytics,
        initialData: LiveAnalytics.initial(),
        child: Consumer<LiveAnalytics>(
          builder: (context, liveAnalytics, _) {
            return CustomScrollView(
              slivers: [
                SliverGrid.count(
                  crossAxisCount: 2,
                  children: [
                    KpiCard(
                      title: 'Active Sessions',
                      value: liveAnalytics.activeSessions.toString(),
                    ),
                    KpiCard(
                      title: 'Connected Devices',
                      value: liveAnalytics.connectedDevices.toString(),
                    ),
                    KpiCard(
                      title: 'Coupons Issued',
                      value: liveAnalytics.totalCouponsIssued.toString(),
                    ),
                    KpiCard(
                      title: 'Coupons Expired',
                      value: liveAnalytics.totalCouponsExpired.toString(),
                    ),
                    KpiCard(
                      title: 'Today\'s Revenue',
                      value: NumberFormat.simpleCurrency()
                          .format(liveAnalytics.todayRevenue),
                    ),
                  ],
                ),
                const SliverToBoxAdapter(
                  child: Padding(
                    padding: EdgeInsets.all(16.0),
                    child: SizedBox(
                      height: 200,
                      child: UsageLineChart(),
                    ),
                  ),
                ),
              ],
            );
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          showMenu(
            context: context,
            position: const RelativeRect.fromLTRB(100, 100, 0, 0),
            items: [
              const PopupMenuItem(
                value: 'issue_coupon',
                child: Text('Issue Coupon'),
              ),
              const PopupMenuItem(
                value: 'revoke_coupon',
                child: Text('Revoke Coupon'),
              ),
              const PopupMenuItem(
                value: 'disconnect_by_mac',
                child: Text('Disconnect by MAC'),
              ),
              const PopupMenuItem(
                value: 'disconnect_session',
                child: Text('Disconnect Session'),
              ),
              const PopupMenuItem(
                value: 'issue_refund',
                child: Text('Issue Refund'),
              ),
            ],
          ).then((value) {
            if (value == 'issue_coupon') {
              _showActionPanel(
                context,
                const CouponActionPanel(adminId: 'admin'),
              );
            } else if (value == 'revoke_coupon') {
              _showActionPanel(
                context,
                const RevokeCouponActionPanel(adminId: 'admin'),
              );
            } else if (value == 'disconnect_by_mac') {
              _showActionPanel(
                context,
                const DeviceActionPanel(adminId: 'admin'),
              );
            } else if (value == 'disconnect_session') {
              _showActionPanel(
                context,
                const DisconnectSessionActionPanel(adminId: 'admin'),
              );
            } else if (value == 'issue_refund') {
              _showActionPanel(
                context,
                const RefundActionPanel(adminId: 'admin'),
              );
            }
          });
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
