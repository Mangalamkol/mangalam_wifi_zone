import express from "express";
import AgentTask from "../models/agentTask.model.js";

const router = express.Router();

router.get("/agent/tasks", async (req, res) => {
  const now = new Date();

  const task = await AgentTask.findOne({
    status: "PENDING",
    $or: [
      { nextRetryAt: null },
      { nextRetryAt: { $lte: now } }
    ],
  }).sort({ createdAt: 1 });

  if (!task) return res.json(null);

  task.status = "PROCESSING";
  await task.save();

  res.json(task);
});

router.post("/agent/tasks/:id/done", async (req, res) => {
  await AgentTask.findByIdAndUpdate(req.params.id, {
    status: "DONE",
  });
  res.sendStatus(200);
});

router.post("/agent/tasks/:id/fail", async (req, res) => {
  const task = await AgentTask.findById(req.params.id);
  if (!task) return res.sendStatus(404);

  task.status = "PENDING";
  task.retries += 1;
  task.lastError = req.body.error;
  task.nextRetryAt = new Date(Date.now() + 60 * 1000);

  await task.save();
  res.sendStatus(200);
});

export default router;