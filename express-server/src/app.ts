import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import { json } from 'body-parser';

export const createApp = () => {
    const app = express();

    // Request logging middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        const timestamp = new Date().toISOString();
        console.log(`📨 [${timestamp}] ${req.method} ${req.path}`);
        next();
    });

    // CORS configuration for multiple frontends
    const allowedOrigins = process.env.CORS_ORIGIN 
        ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
        : ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3001'];

    app.use(cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (mobile apps, Postman, etc.)
            if (!origin) return callback(null, true);
            
            if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
                callback(null, true);
            } else {
                console.warn(`⚠️  CORS blocked origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    app.use(json());

    // Health check endpoint
    app.get('/health', (req: Request, res: Response) => {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            uptime: process.uptime()
        });
    });

    // API routes
    app.use('/api', routes);

    // 404 handler
    app.use((req: Request, res: Response) => {
        console.warn(`⚠️  404 - Route not found: ${req.method} ${req.path}`);
        res.status(404).json({ 
            error: 'Route not found',
            path: req.path,
            method: req.method
        });
    });

    // Error handling middleware
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('❌ Error:', err.message);
        console.error('📍 Stack:', err.stack);
        res.status(500).json({ 
            error: 'Internal server error',
            message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
        });
    });

    return app;
};
