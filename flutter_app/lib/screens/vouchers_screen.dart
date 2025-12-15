import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'create_voucher_screen.dart';

class VouchersScreen extends StatefulWidget {
  final String ipAddress;
  final String token;

  const VouchersScreen({super.key, required this.ipAddress, required this.token});

  @override
  State<VouchersScreen> createState() => _VouchersScreenState();
}

class _VouchersScreenState extends State<VouchersScreen> {
  List<dynamic> _vouchers = [];
  bool _isLoading = true;
  String _error = '';

  @override
  void initState() {
    super.initState();
    _fetchVouchers();
  }

  Future<void> _fetchVouchers() async {
    setState(() {
      _isLoading = true;
      _error = '';
    });

    final Uri url = Uri.parse('https://${widget.ipAddress}/api/v2/hotspot/vouchers?token=${widget.token}');

    try {
      final response = await http.get(url, headers: {'Content-Type': 'application/json; charset=UTF-8'});
      final responseBody = jsonDecode(response.body);

      if (response.statusCode == 200 && responseBody['errorCode'] == 0) {
        setState(() {
          _vouchers = responseBody['result']['data'];
          _isLoading = false;
        });
      } else {
        setState(() {
          _error = 'Failed to fetch vouchers: ${responseBody['msg'] ?? 'Unknown error'}';
          _isLoading = false;
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Error: ${e.toString()}';
        _isLoading = false;
      });
    }
  }

  void _navigateAndRefresh() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => CreateVoucherScreen(ipAddress: widget.ipAddress, token: widget.token),
      ),
    );

    if (result == true) {
      _fetchVouchers();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Vouchers'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _fetchVouchers,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error.isNotEmpty
              ? Center(child: Text(_error, style: const TextStyle(color: Colors.red)))
              : ListView.builder(
                  itemCount: _vouchers.length,
                  itemBuilder: (context, index) {
                    final voucher = _vouchers[index];
                    return ListTile(
                      title: Text(voucher['code'] ?? 'No Code'),
                      subtitle: Text('Status: ${voucher['status'] == 0 ? 'Unused' : 'Used'}'),
                      trailing: Text('Created: ${DateTime.fromMillisecondsSinceEpoch(voucher['create_time'] * 1000)}'),
                    );
                  },
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateAndRefresh,
        child: const Icon(Icons.add),
      ),
    );
  }
}
