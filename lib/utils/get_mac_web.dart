import 'dart:html' as html;

Future<String?> getClientMac() async {
  // Web (OC200 inject)
  final uri = Uri.parse(html.window.location.href);
  return uri.queryParameters['clientMac'] ??
         uri.queryParameters['mac'];
}
