import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:timeago/timeago.dart' as timeago;
import 'session_provider.dart';

class SessionManagement extends StatelessWidget {
  const SessionManagement({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => SessionProvider(),
      child: const SessionManagementBody(),
    );
  }
}

class SessionManagementBody extends StatelessWidget {
  const SessionManagementBody({super.key});

  @override
  Widget build(BuildContext context) {
    final sessionProvider = context.watch<SessionProvider>();

    return Scaffold(
      appBar: AppBar(
        title: const Text('Live Sessions'),
      ),
      body: StreamBuilder<QuerySnapshot>(
        stream: sessionProvider.sessionsStream,
        builder: (context, snapshot) {
          if (snapshot.hasError) {
            return const Center(child: Text('Something went wrong'));
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final sessions = snapshot.data!.docs;

          return ListView.builder(
            itemCount: sessions.length,
            itemBuilder: (context, index) {
              final session = sessions[index];
              final sessionData = session.data() as Map<String, dynamic>;

              final connectedAt = (sessionData['connectedAt'] as Timestamp).toDate();

              return ListTile(
                title: Text(sessionData['macAddress']),
                subtitle: const Text('Coupon: \${sessionData[\'couponCode\']}'),
                trailing: Text(timeago.format(connectedAt)),
              );
            },
          );
        },
      ),
    );
  }
}
