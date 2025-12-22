import { connectDB } from "./utils/db.js";
import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/payment.routes.js";
import planRoutes from "./routes/plan.routes.js";
import "./jobs/session.job.js";
import "./cron/cron.js";

const app = express();

// Capture the raw body for webhook verification
app.use((req, res, next) => {
  req.rawBody = "";
  req.on("data", (chunk) => (req.rawBody += chunk.toString()));
  next();
});

app.use(cors());
app.use(express.json());

app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/plan", planRoutes);

const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  app.listen(PORT, async () => {
    console.log(`SERVER RUNNING ON ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
