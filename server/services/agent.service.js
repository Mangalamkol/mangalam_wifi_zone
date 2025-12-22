import Task from "../models/task.model.js";

// TODO: Implement the actual agent communication logic
export async function dispatchTask(task) {
  console.log(`Dispatching task ${task._id} to agent.`);
  // Simulate a successful task completion for now
  task.status = "DONE";
  await task.save();
}
