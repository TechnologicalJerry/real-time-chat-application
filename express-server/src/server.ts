import 'dotenv/config';
import http from 'http';
import { createApp } from './app';
import { connectDB } from './config/database';
import { registerSocket } from './socket';

// Validate environment variables
const validateEnv = () => {
    const required = ['MONGO_URI', 'JWT_SECRET'];
    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
        console.error('❌ Missing required environment variables:', missing.join(', '));
        console.error('💡 Please create a .env file with the required variables');
        process.exit(1);
    }
};

// Startup function
(async () => {
    try {
        console.log('\n🚀 Starting server...\n');
        console.log('📋 Environment:', process.env.NODE_ENV || 'development');

        // Validate environment
        validateEnv();
        console.log('✅ Environment variables validated\n');

        // Create Express app
        const app = createApp();
        console.log('✅ Express app created\n');

        // Create HTTP server
        const server = http.createServer(app);

        // Setup Socket.IO with multiple origins
        const allowedOrigins = process.env.CORS_ORIGIN
            ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
            : ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:3001'];

        const { Server } = await import('socket.io');
        const io = new Server(server, {
            cors: {
                origin: allowedOrigins.includes('*') ? '*' : allowedOrigins,
                credentials: true,
                methods: ['GET', 'POST']
            }
        });
        registerSocket(io);
        console.log('✅ Socket.IO configured');
        console.log(`🔗 Allowed origins: ${allowedOrigins.join(', ')}\n`);

        // Connect to database
        await connectDB(process.env.MONGO_URI!);
        console.log('');

        // Start server
        const PORT = process.env.PORT || 9000;
        server.listen(PORT, () => {
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log('🎉 Server is running successfully!');
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
            console.log(`📍 Local:    http://localhost:${PORT}`);
            console.log(`📍 Health:   http://localhost:${PORT}/health`);
            console.log(`📍 API:      http://localhost:${PORT}/api`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
            console.log('📊 Monitoring requests...\n');
        });

        // Graceful shutdown
        const shutdown = async (signal: string) => {
            console.log(`\n⚠️  ${signal} received, shutting down gracefully...`);

            server.close(() => {
                console.log('✅ HTTP server closed');
            });

            await io.close();
            console.log('✅ Socket.IO closed');

            await import('mongoose').then(({ default: mongoose }) => {
                mongoose.connection.close();
                console.log('✅ MongoDB connection closed');
            });

            console.log('👋 Server shutdown complete');
            process.exit(0);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
})();
