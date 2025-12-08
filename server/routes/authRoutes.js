/**
 * Minimal placeholder authRoutes so server won't crash.
 * Replace with your real auth implementations later.
 */
const express = require('express');
const router = express.Router();

// health-check / placeholder route
router.get('/_placeholder', (req, res) => {
  res.json({ ok: true, msg: 'authRoutes placeholder' });
});

// example login endpoint (no-op)
router.post('/login', (req, res) => {
  // return a NOT-IMPLEMENTED placeholder response
  res.status(501).json({ error: 'login not implemented', hint: 'replace authRoutes.js with real code' });
});

module.exports = router;
