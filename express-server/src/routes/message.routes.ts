import { Router } from 'express';
import { getMessages } from '../controllers/message.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
router.get('/', authMiddleware, getMessages);
export default router;
