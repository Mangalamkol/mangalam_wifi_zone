const express = require('express');
const router = express.Router();

/**
 * Health Check
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Mangalam WiFi Zone API',
    time: new Date().toISOString()
  });
});

module.exports = router;