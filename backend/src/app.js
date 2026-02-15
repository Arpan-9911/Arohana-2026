import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';


import eventRoutes from './routes/event.routes.js';
import adminAuthRoutes from './routes/adminAuth.routes.js';
import userAuthRoutes from './routes/userAuth.routes.js';
import superAdminRoutes from './routes/superAdmin.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(helmet());

app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'],
    origin: ['https://ownhosting.whatever'],
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

app.use(globalErrorHandler);
app.get("/", (req, res) => {
    res.json({ message: "API is running", route: req.originalUrl });
});

app.all("/*path", (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`);
    err.statusCode = 404;
    next(err);
});

app.use(globalErrorHandler);

export default app;
