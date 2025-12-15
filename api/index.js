const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/api/plans', (req, res) => {
  res.json([
    { id: 1, name: 'Basic' },
    { id: 2, name: 'Premium' },
  ]);
});

app.get('/api/coupons', (req, res) => {
  res.json([
    { id: 1, code: 'SAVE10' },
    { id: 2, code: 'SAVE20' },
  ]);
});

app.get('/api/transactions', (req, res) => {
  res.json([
    { id: 1 },
    { id: 2 },
  ]);
});

app.get('/api/activity-logs', (req, res) => {
  res.json([
    { id: 1, action: 'Created plan' },
    { id: 2, action: 'Deleted coupon' },
  ]);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    res.json({ token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
