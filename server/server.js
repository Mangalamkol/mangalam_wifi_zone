require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodeCron = require('node-cron');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Webhook route needs raw body for signature verification
app.use('/api/payment/webhook', bodyParser.raw({ type: 'application/json' }));

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// --- Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connect error', err);
  });

// --- API routes
app.use("/api", require("./routes"));


// --- Serve built admin and client as static
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));
app.use('/client', express.static(path.join(__dirname, 'public', 'client')));

// Fallback for client-side routing
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'index.html'));
});
app.get('/client/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client', 'index.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client', 'index.html'));
});

// --- Cron job to expire coupons and vouchers
require('./cron/autoExpire');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});