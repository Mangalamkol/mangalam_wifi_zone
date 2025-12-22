import { Router } from "express";
import { process, handler } from "../../utils/commons.js";

const expiryWebhook = Router();

expiryWebhook.post("/", async (req, res) => {
  const { payload } = req.body;

  const [result, error] = await handler(process("EXPIRED_VOUCHER", payload), req);

  if (error) {
    return res.status(500).json({ error });
  }

  res.json(result);
});

export default expiryWebhook;
