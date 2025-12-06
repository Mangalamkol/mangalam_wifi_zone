require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize cron jobs
require("./cron/cron");

const app = express();
const server = http.createServer(app);

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/coupons", require("./routes/couponRoutes"));
app.use("/api/razorpay", require("./routes/razorpayRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
