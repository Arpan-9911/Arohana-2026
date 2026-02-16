import express from 'express';
import { adminLoginController, adminLogoutController } from '../controllers/adminAuth.controller.js';

const router = express.Router();

router.post('/login', adminLoginController);
router.post('/logout', adminLogoutController);
export default router;