class User {
  final String id;
  final String username;
  final String token;

  User({required this.id, required this.username, required this.token});

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['_id'],
      username: json['username'],
      token: json['token'],
    );
  }
}
