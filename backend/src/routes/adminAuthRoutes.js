import express from 'express';
import { adminLoginController, adminLogoutController } from '../controllers/adminAuthController.js';

const router = express.Router();

router.post('/login', adminLoginController);
router.get('/logout', adminLogoutController);
export default router;