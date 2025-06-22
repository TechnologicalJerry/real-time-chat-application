import http from 'http';
import { createApp } from './app';
import { connectDB } from './config/db';
import { registerSocket } from './socket';

(async () => {
    const app = createApp();
    const server = http.createServer(app);
    const { Server } = await import('socket.io');
    const io = new Server(server, {
        cors: { origin: '*' }
    });
    registerSocket(io);

    connectDB(process.env.MONGO_URI!);

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
})();
