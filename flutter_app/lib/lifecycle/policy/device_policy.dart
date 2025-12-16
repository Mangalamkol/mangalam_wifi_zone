class DevicePolicy {
  final int allowedDevices;

  DevicePolicy(this.allowedDevices);

  bool isBreached(int connectedDevices) {
    return connectedDevices > allowedDevices;
  }
}