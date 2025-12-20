import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plans", planRoutes);

const PORT = process.env.PORT || 18000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("SERVER RUNNING ON PORT", PORT);
  });
});
