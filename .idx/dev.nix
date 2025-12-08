{ pkgs, ... }:

{
  # Select stable NixOS channel
  channel = "stable-24.05";

  # Packages to install
  packages = [
    pkgs.jdk21
    pkgs.unzip
    pkgs.nodejs_20
  ];

  # Environment variables
  env = {
    WHATSAPP_VERIFY_TOKEN = "your_whatsapp_verify_token";
    JWT_SECRET = "your_super_secret_jwt_key";
    RAZORPAY_KEY = "your_razorpay_key";
    RAZORPAY_SECRET = "your_razorpay_secret";
    RAZORPAY_WEBHOOK_SECRET = "your_razorpay_webhook_secret";
    WHATSAPP_ACCESS_TOKEN = "your_whatsapp_access_token";
    WHATSAPP_PHONE_NUMBER_ID = "your_whatsapp_phone_number_id";

    OC200_URL = "your_oc200_url";
    OC200_USERNAME = "your_oc200_username";
    OC200_PASSWORD = "your_oc200_password";
  };

  # VSCode Extensions
  idx = {
    extensions = [
      "Dart-Code.flutter"
      "Dart-Code.dart-code"
    ];
  };
}