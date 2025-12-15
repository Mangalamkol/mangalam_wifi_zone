class Plan {
  final String id;
  final String name;
  final int price;
  final int validity;
  final int data;

  Plan({required this.id, required this.name, required this.price, required this.validity, required this.data});

  factory Plan.fromJson(Map<String, dynamic> json) {
    return Plan(
      id: json['_id'],
      name: json['name'],
      price: json['price'],
      validity: json['validity'],
      data: json['data'],
    );
  }
}
