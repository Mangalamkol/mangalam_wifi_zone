import Task from "../models/task.model.js";
import { dispatchTask } from "./agent.service.js";

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

async function retryTask(task) {
  if (task.retries < MAX_RETRIES) {
    console.log(`Retrying task ${task._id} (attempt ${task.retries + 1})`);
    task.status = "pending";
    task.retries++;
    await task.save();
    setTimeout(() => dispatchTask(task), RETRY_DELAY);
  } else {
    console.log(`Task ${task._id} failed after ${MAX_RETRIES} retries.`);
    task.status = "failed";
    await task.save();
  }
}

export async function handleFailedTask(taskId) {
  const task = await Task.findById(taskId);
  if (task) {
    await retryTask(task);
  }
}
