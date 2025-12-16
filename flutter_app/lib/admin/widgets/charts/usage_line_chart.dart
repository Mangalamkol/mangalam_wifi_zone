import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../../analytics/admin_analytics_provider.dart';
import '../../../analytics/live_analytics.dart';

class UsageLineChart extends StatelessWidget {
  const UsageLineChart({super.key});

  @override
  Widget build(BuildContext context) {
    return StreamProvider<LiveAnalytics>.value(
      value: context.read<AdminAnalyticsProvider>().liveAnalytics,
      initialData: LiveAnalytics.initial(),
      child: Consumer<LiveAnalytics>(
        builder: (context, liveAnalytics, _) {
          return LineChart(
            LineChartData(
              lineBarsData: [
                LineChartBarData(
                  spots: liveAnalytics.usageHistory
                      .asMap()
                      .entries
                      .map((e) => FlSpot(e.key.toDouble(), e.value))
                      .toList(),
                  isCurved: true,
                  barWidth: 2,
                  color: Colors.blue,
                  dotData: const FlDotData(show: false),
                ),
              ],
              titlesData: const FlTitlesData(
                leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: true)),
                bottomTitles: AxisTitles(sideTitles: SideTitles(showTitles: true)),
              ),
            ),
          );
        },
      ),
    );
  }
}
