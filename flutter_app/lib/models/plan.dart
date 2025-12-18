class Plan {
  final String id;
  final String name;
  final double price;
  final int durationMinutes;

  Plan({
    required this.id,
    required this.name,
    required this.price,
    required this.durationMinutes,
  });

  factory Plan.fromJson(Map<String, dynamic> json) {
    return Plan(
      id: json['_id'],
      name: json['name'],
      price: json['price'].toDouble(),
      durationMinutes: json['durationMinutes'],
    );
  }
}
