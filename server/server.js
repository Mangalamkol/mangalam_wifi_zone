require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

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

// Serve static assets
app.use(express.static(path.join(__dirname, '..', 'web_client', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'web_client', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
