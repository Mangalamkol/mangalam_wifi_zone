// server/routes/health.js
import express from "express";
const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});

export default router;
