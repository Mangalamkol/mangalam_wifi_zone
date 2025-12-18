import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Render will provide PORT automatically
const PORT = process.env.PORT || 3000;

// Serve frontend
const clientPath = path.join(__dirname, "../web_client/dist");
app.use(express.static(clientPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", service: "Mangalam WiFi Zone" });
});

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});