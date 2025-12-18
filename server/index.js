
import express from "express";
import adminControl from "./routes/adminControl.js";
import { systemGuard } from "./middleware/adminFeatureGuard.js";

const app = express();
app.use(express.json());

// 🔒 SYSTEM GUARD
app.use(systemGuard);

// 🔑 ADMIN API
app.use("/api/admin", adminControl);

// ✅ HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Mangalam WiFi Zone" });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});
