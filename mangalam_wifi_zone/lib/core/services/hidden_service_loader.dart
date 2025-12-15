import 'package:mangalam_wifi_zone/core/constants/app_config.dart';

class HiddenServiceLoader {
  // In a real app, this would fetch the URLs from a remote config
  // or a secure local storage.
  static String getRechargeUrl() {
    return HiddenServices.rechargeUrl;
  }

  static String getMovieUrl() {
    return HiddenServices.movieUrl;
  }

  static String getLiveTvUrl() {
    return HiddenServices.liveTvUrl;
  }
}
