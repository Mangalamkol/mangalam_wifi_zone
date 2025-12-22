import express from 'express';
import Device from '../models/device.model.js';

const router = express.Router();

router.post('/update', async (req, res) => {
  const { clientMac, planId, planDurationMs } = req.body;

  if (!clientMac || !planId || !planDurationMs) {
    return res.status(400).json({ error: 'clientMac, planId, and planDurationMs are required.' });
  }

  try {
    await Device.findOneAndUpdate(
      { mac: clientMac },
      {
        mac: clientMac,
        planId,
        expiresAt: new Date(Date.now() + planDurationMs),
        active: true,
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ message: 'Device updated successfully.' });
  } catch (error) {
    console.error('Error updating device:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
