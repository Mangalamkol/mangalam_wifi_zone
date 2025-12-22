/**
 * =========================================================
 * FILE: server.js
 * STATUS: FINAL – DO NOT MODIFY
 * =========================================================
 */

import express from 'express';
import couponRoutes from './routes/couponRoutes.js';
import webhookRoutes from './routes/webhookRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/coupons', couponRoutes);
app.use(webhookRoutes);

app.listen(port, () => {
  console.log(`☁️ Cloud server listening on port ${port}`);
});
