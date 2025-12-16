import 'plan_entity.dart';

class DefaultPlans {
  static final List<PlanEntity> all = [
    const PlanEntity(
      id: '1h_10',
      name: '1 Hour Unlimited',
      duration: Duration(hours: 1),
      price: 10,
      maxDevices: 1,
    ),
    const PlanEntity(
      id: '2h_20',
      name: '2 Hours Unlimited',
      duration: Duration(hours: 2),
      price: 20,
      maxDevices: 1,
    ),
    const PlanEntity(
      id: '5h_30',
      name: '5 Hours Unlimited',
      duration: Duration(hours: 5),
      price: 30,
      maxDevices: 1,
    ),
    const PlanEntity(
      id: '24h_50',
      name: '24 Hours Unlimited',
      duration: Duration(hours: 24),
      price: 50,
      maxDevices: 1,
    ),
    const PlanEntity(
      id: '30d_100',
      name: '30 Days Unlimited',
      duration: Duration(days: 30),
      price: 100,
      maxDevices: 1,
    ),
    const PlanEntity(
      id: '30d_300_5d',
      name: '30 Days Unlimited (5 Devices)',
      duration: Duration(days: 30),
      price: 300,
      maxDevices: 5,
    ),
  ];
}