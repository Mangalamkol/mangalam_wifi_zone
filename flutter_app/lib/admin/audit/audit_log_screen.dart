import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import 'audit_log_provider.dart';

class AuditLogScreen extends StatelessWidget {
  const AuditLogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => AuditLogProvider(),
      child: const AuditLogScreenBody(),
    );
  }
}

class AuditLogScreenBody extends StatelessWidget {
  const AuditLogScreenBody({super.key});

  @override
  Widget build(BuildContext context) {
    final auditLogProvider = context.watch<AuditLogProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Admin Audit Log'),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: auditLogProvider.auditLogStream,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('Something went wrong'));
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final logs = snapshot.data!.docs;

          return ListView.builder(
            itemCount: logs.length,
            itemBuilder: (context, index) {
              final log = logs[index];
              final logData = log.data() as Map<String, dynamic>;

              final adminId = logData['adminId'] ?? '';
              final actionType = logData['actionType'] ?? '';
              final targetId = logData['targetId'] ?? '';
              final timestamp = logData['timestamp'] as Timestamp?;

              final formattedTime = timestamp != null
                  ? DateFormat.yMd().add_Hms().format(timestamp.toDate())
                  : 'No timestamp';

              return const ListTile(
                title: Text('Action: \$actionType'),
                subtitle: Text(
                    'Admin: \$adminId\nTarget: \$targetId\nTime: \$formattedTime'),
              );
            },
          );
        },
      ),
    );
  }
}
