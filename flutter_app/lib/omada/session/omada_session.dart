class OmadaSession {
  final String baseUrl;
  String? cookie;

  OmadaSession(this.baseUrl);

  Map<String, String> get headers => {
        'Content-Type': 'application/json',
        if (cookie != null) 'Cookie': cookie!,
      };
}