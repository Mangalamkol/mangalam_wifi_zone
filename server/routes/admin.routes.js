import express from "express";
import { login } from "../controllers/authController.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { ocAuthorize, ocUnauthorize } from "../services/oc200.service.js";
import { createSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/auth/login", login);

router.post("/oc/authorize", adminAuth, async (req, res) => {
  try {
    const { mac, minutes } = req.body;
    await ocAuthorize(mac, minutes);
    res.json({ message: "Client authorized successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to authorize client.", error: error.message });
  }
});

router.post("/oc/unauthorize", adminAuth, async (req, res) => {
  try {
    const { mac } = req.body;
    await ocUnauthorize(mac);
    res.json({ message: "Client unauthorized successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to unauthorize client.", error: error.message });
  }
});

router.post("/session/create", adminAuth, createSession);

export default router;
