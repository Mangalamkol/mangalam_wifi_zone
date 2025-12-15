import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

class RedeemCodeScreen extends StatefulWidget {
  const RedeemCodeScreen({super.key});

  @override
  State<RedeemCodeScreen> createState() => _RedeemCodeScreenState();
}

class _RedeemCodeScreenState extends State<RedeemCodeScreen> {
  final _codeController = TextEditingController();
  bool _isLoading = false;

  Future<void> _redeemCode() async {
    setState(() {
      _isLoading = true;
    });

    final code = _codeController.text.trim();
    final user = FirebaseAuth.instance.currentUser;

    if (code.isEmpty || user == null) {
      _showError('Invalid code or user.');
      return;
    }

    final codeRef = FirebaseFirestore.instance.collection('codes').doc(code);

    try {
      final codeDoc = await codeRef.get();

      if (!codeDoc.exists) {
        _showError('Code not found.');
        return;
      }

      final data = codeDoc.data()!;
      if (data['used'] == true) {
        _showError('This code has already been used.');
        return;
      }

      await codeRef.update({
        'used': true,
        'assignedTo': user.uid,
        'redeemedAt': FieldValue.serverTimestamp(),
      });

      _showSuccess('Code redeemed successfully!');
    } catch (e) {
      _showError('An error occurred: $e');
    }
  }

  void _showError(String message) {
    setState(() {
      _isLoading = false;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.red),
    );
  }

  void _showSuccess(String message) {
    setState(() {
      _isLoading = false;
    });
    _codeController.clear();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: Colors.green),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Redeem Code'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _codeController,
              decoration: const InputDecoration(
                labelText: 'Enter Code',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 16),
            _isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _redeemCode,
                    child: const Text('Redeem'),
                  ),
          ],
        ),
      ),
    );
  }
}
