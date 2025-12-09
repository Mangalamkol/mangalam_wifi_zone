process.on("uncaughtException", err => {
  console.error("LIVE ERROR:", err);
});
process.on("unhandledRejection", err => {
  console.error("UNHANDLED PROMISE:", err);
});
