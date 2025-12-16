import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:intl/intl.dart';

class EventTile extends StatelessWidget {
  final QueryDocumentSnapshot event;

  const EventTile({
    super.key,
    required this.event,
  });

  @override
  Widget build(BuildContext context) {
    final data = event.data() as Map<String, dynamic>;
    final voucher = data['voucher'] ?? 'N/A';
    final eventName = data['event'] ?? 'N/A';
    final timestamp = data['time'] as Timestamp;
    final formattedTime = DateFormat.yMd().add_Hms().format(timestamp.toDate());

    return ListTile(
      title: Text('$eventName: $voucher'),
      subtitle: Text(formattedTime),
      leading: const Icon(Icons.info),
    );
  }
}
