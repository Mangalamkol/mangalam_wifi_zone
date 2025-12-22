import express from 'express';
import { handleExpiration } from '../webhooks/expiration.js';

const router = express.Router();

router.post('/webhooks/expiration', handleExpiration);

export default router;
