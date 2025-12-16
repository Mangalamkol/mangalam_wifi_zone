import 'package:flutter/material.dart';
import '../../actions/session_actions.dart';

class DisconnectSessionActionPanel extends StatefulWidget {
  final String adminId;

  const DisconnectSessionActionPanel({super.key, required this.adminId});

  @override
  _DisconnectSessionActionPanelState createState() =>
      _DisconnectSessionActionPanelState();
}

class _DisconnectSessionActionPanelState
    extends State<DisconnectSessionActionPanel> {
  final _sessionIdController = TextEditingController();
  String _selectedReason = 'admin';

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _sessionIdController,
            decoration: const InputDecoration(
              labelText: 'Session ID',
            ),
          ),
          const SizedBox(height: 16),
          DropdownButton<String>(
            value: _selectedReason,
            onChanged: (String? newValue) {
              setState(() {
                _selectedReason = newValue!;
              });
            },
            items: <String>['admin', 'device_limit', 'expiry']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
          ),
          const SizedBox(height: 16),
          ElevatedButton(
            onPressed: () {
              final sessionId = _sessionIdController.text;
              if (sessionId.isNotEmpty) {
                disconnectSession(context, sessionId, _selectedReason, widget.adminId);
                Navigator.of(context).pop();
              }
            },
            child: const Text('Disconnect Session'),
          ),
        ],
      ),
    );
  }
}
