
import 'package:flutter/material.dart';

class FailureReportScreen extends StatefulWidget {
  final String transactionId;
  final String phone;

  const FailureReportScreen({
    super.key,
    required this.transactionId,
    required this.phone,
  });

  @override
  State<FailureReportScreen> createState() => _FailureReportScreenState();
}

class _FailureReportScreenState extends State<FailureReportScreen> {
  final _issueController = TextEditingController();
  bool _isSubmitting = false;

  Future<void> _submitReport() async {
    if (_issueController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please describe your issue.')),
      );
      return;
    }

    setState(() {
      _isSubmitting = true;
    });

    // Simulate API call to POST /api/help/report
    await Future.delayed(const Duration(seconds: 1));

    final reportData = {
      'type': 'RECOVERY_FAILED',
      'transactionId': widget.transactionId,
      'phone': widget.phone,
      'timestamp': DateTime.now().toIso8601String(),
      'status': 'open',
      'description': _issueController.text,
    };

    // In a real app, you would send this data to your backend.
    print('Submitting report: $reportData');

    setState(() {
      _isSubmitting = false;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Issue reported successfully!')),
    );
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Report an Issue'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            Text('Transaction ID: ${widget.transactionId}'),
            const SizedBox(height: 8),
            Text('Phone: ${widget.phone}'),
            const SizedBox(height: 24),
            TextField(
              controller: _issueController,
              decoration: const InputDecoration(
                labelText: 'Describe your issue',
                border: OutlineInputBorder(),
              ),
              maxLines: 5,
            ),
            const SizedBox(height: 24),
            if (_isSubmitting)
              const CircularProgressIndicator()
            else
              ElevatedButton(
                onPressed: _submitReport,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                ),
                child: const Text('Submit Report'),
              ),
          ],
        ),
      ),
    );
  }
}
