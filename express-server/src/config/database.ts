import mongoose from 'mongoose';

export const connectDB = async (uri: string) => {
    try {
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log('✅ MongoDB connected successfully');
        
        const dbName = mongoose.connection.db?.databaseName;
        if (dbName) {
            console.log(`📍 Database: ${dbName}`);
        }
        
        // Connection event handlers
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('🔄 MongoDB reconnected');
        });

    } catch (err) {
        console.error('❌ DB connection error:', err);
        console.error('💡 Please check your MONGO_URI environment variable');
        process.exit(1);
    }
};
