import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.routes.js';

// 🔒 LIVE MODE LOCK
if (process.env.NODE_ENV !== "production") {
  console.log("⚠️ WARNING: Not in production");
}

console.log("🚀 Mangalam WiFi Zone is LIVE & OPERATIONAL");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.disable("x-powered-by");
}

// Middleware
app.use(express.json());
app.use(cors());

// DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// API Routes
app.use('/api', routes);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
