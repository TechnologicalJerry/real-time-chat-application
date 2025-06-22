import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import messageRoutes from './routes/message.routes';
import { json } from 'body-parser';

export const createApp = () => {
    const app = express();
    app.use(cors(), json());
    app.use('/api/auth', authRoutes);
    app.use('/api/messages', messageRoutes);
    return app;
};
