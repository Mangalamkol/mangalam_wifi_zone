
import express from "express";
import adminControl from "./routes/adminControl.js";
import { systemGuard } from "./middleware/adminFeatureGuard.js";
import healthRoute from "./routes/health.js";

const app = express();
app.use(express.json());

// 🔒 SYSTEM GUARD
app.use(systemGuard);

// 🔑 ADMIN API
app.use("/api/admin", adminControl);

// ✅ HEALTH CHECK
app.use("/api", healthRoute);

app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Mangalam WiFi Zone</title>
      </head>
      <body style=\"font-family:sans-serif\">
        <h2>Mangalam WiFi Zone – LIVE</h2>
        <ul>
          <li>Status: OK</li>
          <li>Backend: Active</li>
          <li>
            Web Client:
            <a href=\"https://mangalamwifi.web.app\" target=\"_blank\">
              Open
            </a>
          </li>
        </ul>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("SERVER RUNNING ON PORT", PORT);
});
