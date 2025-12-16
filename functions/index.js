import express from "express";
import mongoose from "mongoose";
import omadaLogin from "./services/omadaLogin.js";

const app = express();
app.use(express.json());

// Make sure to set your MONGO_URI in Render's environment variables
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/api/omada/login", omadaLogin);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
