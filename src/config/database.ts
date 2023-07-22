import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connection.once('open', () => console.log('Connected to Database Server'));
mongoose.connection.on('error', (err: Error) => console.error(err.message));

async function ConnectDatabase(): Promise<void> {
    try {
        const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/';

        await mongoose.connect(URL)
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default ConnectDatabase;