import https, { Server } from 'https';
import { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config();

import App from './app';
import ConnectDatabase from "./config/database";
import Certificate from './config/keys';

const PORT: number = Number(process.env.PORT) || 3000;
const app = new App().app;

const server: Server = https.createServer({
    key: Certificate.KEY,
    cert: Certificate.CERT ,
}, app as Application);

const startServer = async (): Promise<void> => {
    try {
        await ConnectDatabase();

        server.listen(PORT, () => console.log(`App listening at PORT: https://localhost:${PORT}`));
    } catch (error) {
        console.error(error, "App failed to start");
        process.exit(1);
    }
}

startServer();