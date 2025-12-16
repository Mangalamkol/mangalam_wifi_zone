import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import omadaLogin from './services/omadaLogin.js';
import 'dotenv/config'; // To use .env file for local development

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Environment variables
const { MONGO_URI, PORT } = process.env;

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));

// API Routes
app.get('/', (req, res) => {
  res.send('Mangalam WiFi Zone Backend is running');
});

app.post('/api/omada/login', omadaLogin);

// Start Server
const port = PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));
