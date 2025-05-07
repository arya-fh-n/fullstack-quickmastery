import express from 'express';
import forumsRouter from './forums.router.js';
import authRouter from './auth.router.js';
import logsRouter from './logs.router.js';

const router = express.Router();

router.use('/forums', forumsRouter);
router.use('/auth', authRouter);
router.use('/history', logsRouter);

export default router;
