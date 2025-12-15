class Result<T> {
  final T? data;
  final String? error;

  const Result._({this.data, this.error});

  bool get isSuccess => data != null;

  factory Result.success(T data) {
    return Result._(data: data);
  }

  factory Result.failure(String message) {
    return Result._(error: message);
  }
}
