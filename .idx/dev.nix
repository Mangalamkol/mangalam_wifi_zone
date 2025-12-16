{ pkgs, ... }:

{
  # Packages available in the IDX workspace
  packages = [
    pkgs.nodejs_20
    pkgs.firebase-tools
    pkgs.flutter
    pkgs.dart
    pkgs.git
    pkgs.curl
    pkgs.openssl
  ];

  # Environment variables (safe defaults)
  env = {
    NODE_ENV = "development";
  };

  # Optional startup commands (kept minimal for stability)
  startup = {
    commands = [
      {
        command = "flutter --version";
        silently = true;
      }
      {
        command = "firebase --version";
        silently = true;
      }
    ];
  };
}