import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes/index.routes.js';

const app = express();

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
