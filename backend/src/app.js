import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';


import eventRoutes from './routes/event.routes.js';
import teamRoutes from './routes/team.route.js';
import userRoutes from './routes/user.route.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import userAuthRoutes from './routes/userAuth.routes.js';
import superAdminRoutes from './routes/admin.routes.js';
import qrRoutes from './routes/qr.routes.js';
import societyRoutes from './routes/society.routes.js';

import { globalErrorHandler } from './middleware/error.middleware.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
    origin: [
        'https://ownhosting.whatever',
        "http://localhost:5173",
    ],
    credentials: true
}));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    "/uploads",
    express.static(path.join(__dirname, "../uploads"))
);
app.use("/api/v1/auth/admin", adminAuthRoutes);
app.use("/api/v1/auth/user", userAuthRoutes);
app.use("/api/v1/admin", superAdminRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/teams", teamRoutes);
app.use("/api/v1/qr", qrRoutes);
app.use("/api/v1/society", societyRoutes);

app.get("/", (req, res) => {
    res.json({ message: "API is running", route: req.originalUrl });
});

app.all("/*path", (req, res, next) => {
    const err = new Error(`Can't ${req.method} ${req.originalUrl} on this server`);
    err.statusCode = 404;
    next(err);
});

app.use(globalErrorHandler);

export default app;
