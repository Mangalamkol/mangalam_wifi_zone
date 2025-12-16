const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('Mangalam WiFi Zone Backend is running');
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected");
        app.listen(PORT, () => console.log("Server running on port " + PORT));
    })
    .catch(err => console.error(err));
