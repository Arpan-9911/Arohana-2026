import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import adminAuthRoutes from './routes/adminAuthRoutes.js';
import userAuthRoutes from './routes/userAuthRoutes.js';

const app = express();

app.use(helmet());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: ['https://ownhosting.whatever'],
    credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth/admin", adminAuthRoutes);
app.use("/api/v1/auth/user", userAuthRoutes);

app.get("/", (req, res) => {
    res.json({ message: "Arohana Backend Running" });
});

export default app;
