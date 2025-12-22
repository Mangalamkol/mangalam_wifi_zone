import mongoose from "mongoose";

const AgentTaskSchema = new mongoose.Schema({
  type: String,
  mac: String,
  status: {
    type: String,
    enum: ["PENDING", "PROCESSING", "DONE", "FAILED"],
    default: "PENDING",
  },
  retries: { type: Number, default: 0 },
  lastError: String,
  nextRetryAt: Date,
}, { timestamps: true });

export default mongoose.model("AgentTask", AgentTaskSchema);