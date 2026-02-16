import express from 'express';
import { validateQrController } from '../controllers/qr.controller.js';

const router = express.Router();

router.get("/validate/:token", validateQrController);

export default router;