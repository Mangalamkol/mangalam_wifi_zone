class OmadaVoucher {
  final String code;
  final int durationMinutes;
  final int maxDevices;

  OmadaVoucher({
    required this.code,
    required this.durationMinutes,
    this.maxDevices = 1,
  });
}