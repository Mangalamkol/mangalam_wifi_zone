import AgentTask from "../models/agentTask.model.js";

const MAX_RETRY = 5;
const RETRY_DELAY_MS = 60 * 1000;

export async function markTaskFailed(task, error) {
  task.retries += 1;
  task.lastError = error.message;

  if (task.retries >= MAX_RETRY) {
    task.status = "FAILED";
  } else {
    task.status = "PENDING";
    task.nextRetryAt = new Date(Date.now() + RETRY_DELAY_MS);
  }

  await task.save();
}