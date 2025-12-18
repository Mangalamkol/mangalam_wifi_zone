import mongoose from "mongoose";

const notificationLogSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  channel: {
    type: String,
    enum: ["whatsapp", "sms"],
    required: true,
  },
  template: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["sent", "failed"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const NotificationLog = mongoose.model(
  "NotificationLog",
  notificationLogSchema
);

export default NotificationLog;
