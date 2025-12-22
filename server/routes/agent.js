import { Router } from "express";
import { agenda } from "../../utils/agenda.js";
import { process, handler } from "../../utils/commons.js";

const agent = Router();

agent.post("/", async (req, res) => {
  const { action, payload } = req.body;

  if (action === "VERIFY_CONNECTIVITY") {
    return res.json({ status: "ok" });
  }

  await agenda.now(action, payload);

  res.json({ status: "ok" });
});

export default agent;
