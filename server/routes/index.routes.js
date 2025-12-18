import express from 'express';
import planRoutes from './plan.routes.js';

const router = express.Router();

router.use('/plans', planRoutes);

export default router;