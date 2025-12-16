import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../analytics/admin_analytics_provider.dart';
import '../../actions/device_actions.dart';

class DeviceActionPanel extends StatefulWidget {
  final String adminId;

  const DeviceActionPanel({super.key, required this.adminId});

  @override
  _DeviceActionPanelState createState() => _DeviceActionPanelState();
}

class _DeviceActionPanelState extends State<DeviceActionPanel> {
  final _deviceIdController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _deviceIdController,
            decoration: const InputDecoration(
              labelText: 'Device ID',
            ),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              final analyticsProvider = context.read<AdminAnalyticsProvider>();
              disconnectDevice(
                analyticsProvider,
                widget.adminId,
                _deviceIdController.text,
              );
              Navigator.of(context).pop();
            },
            child: const Text('Disconnect Device'),
          ),
        ],
      ),
    );
  }
}
