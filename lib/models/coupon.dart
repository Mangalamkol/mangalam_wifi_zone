
import 'package:cloud_firestore/cloud_firestore.dart';

class Coupon {
  final String code;
  final String plan;
  final Timestamp validTill;
  final String? userId;
  final String? deviceId;
  final String status;
  final Timestamp? usedAt;
  final Timestamp createdAt;

  Coupon({
    required this.code,
    required this.plan,
    required this.validTill,
    this.userId,
    this.deviceId,
    this.status = 'active',
    this.usedAt,
    required this.createdAt,
  });

  Coupon copyWith({
    String? code,
    String? plan,
    Timestamp? validTill,
    String? userId,
    String? deviceId,
    String? status,
    Timestamp? usedAt,
    Timestamp? createdAt,
  }) {
    return Coupon(
      code: code ?? this.code,
      plan: plan ?? this.plan,
      validTill: validTill ?? this.validTill,
      userId: userId ?? this.userId,
      deviceId: deviceId ?? this.deviceId,
      status: status ?? this.status,
      usedAt: usedAt ?? this.usedAt,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'code': code,
      'plan': plan,
      'validTill': validTill,
      'userId': userId,
      'deviceId': deviceId,
      'status': status,
      'usedAt': usedAt,
      'createdAt': createdAt,
    };
  }

  factory Coupon.fromMap(Map<String, dynamic> map) {
    return Coupon(
      code: map['code'] ?? '',
      plan: map['plan'] ?? '',
      validTill: map['validTill'] as Timestamp,
      userId: map['userId'],
      deviceId: map['deviceId'],
      status: map['status'] ?? '',
      usedAt: map['usedAt'] as Timestamp?,
      createdAt: map['createdAt'] as Timestamp,
    );
  }

  String toJson() => (toMap()).toString();

  factory Coupon.fromJson(String source) => Coupon.fromMap(source as Map<String, dynamic>);

  @override
  String toString() {
    return 'Coupon(code: $code, plan: $plan, validTill: $validTill, userId: $userId, deviceId: $deviceId, status: $status, usedAt: $usedAt, createdAt: $createdAt)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;

    return other is Coupon &&
      other.code == code &&
      other.plan == plan &&
      other.validTill == validTill &&
      other.userId == userId &&
      other.deviceId == deviceId &&
      other.status == status &&
      other.usedAt == usedAt &&
      other.createdAt == createdAt;
  }

  @override
  int get hashCode {
    return code.hashCode ^
      plan.hashCode ^
      validTill.hashCode ^
      userId.hashCode ^
      deviceId.hashCode ^
      status.hashCode ^
      usedAt.hashCode ^
      createdAt.hashCode;
  }
}
