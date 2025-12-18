import 'package:flutter/material.dart';

class PlanCard extends StatelessWidget {
  final String name;
  final double price;
  final int durationMinutes;
  final VoidCallback? onTap;

  const PlanCard({
    super.key,
    required this.name,
    required this.price,
    required this.durationMinutes,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8.0),
      child: ListTile(
        title: Text(name),
        subtitle: Text('Duration: $durationMinutes minutes'),
        trailing: Text('₹$price'),
        onTap: onTap,
      ),
    );
  }
}
