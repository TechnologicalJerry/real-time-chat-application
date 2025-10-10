import { Router } from 'express';
import authRoutes from './auth.routes';
import sessionRoutes from './session.routes';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import chatRoutes from './chat.routes';

const router = Router();

// Mount all routes
router.use('/auth', authRoutes);
router.use('/session', sessionRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/chat', chatRoutes);

export default router;

