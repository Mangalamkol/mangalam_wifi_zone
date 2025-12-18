import express from 'express';
import mongoose from 'mongoose';
import rateLimiter from './middleware/rateLimiter.js';
import couponRoutes from './routes/couponRoutes.js';
import checkoutRoutes from './routes/checkoutRoutes.js'; // Import the new checkout route
import whatsappRoutes from './routes/whatsappRoutes.js'; // Import whatsapp routes
import logger from './utils/logger.js';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: '.env.production' });
} else {
  dotenv.config();
}


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error(err));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// Apply the rate limiting middleware to all routes starting with /api
app.use('/api', rateLimiter);

app.use("/webhook/whatsapp", (await import('./routes/whatsappWebhook.js')).default);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api', checkoutRoutes); // Use the new checkout route with a /api prefix
app.use('/api/coupons', couponRoutes);

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
