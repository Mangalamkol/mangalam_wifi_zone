import 'package:flutter/material.dart';
import 'package:mangalam_wifi_zone/models/voucher.dart';

class VoucherProvider with ChangeNotifier {
  Voucher? _voucher;

  Voucher? get voucher => _voucher;

  void setVoucher(Voucher voucher) {
    _voucher = voucher;
    notifyListeners();
  }
}
