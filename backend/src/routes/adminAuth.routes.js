import express from 'express';
import { adminLoginController, adminLogoutController, checkAdminAuthController } from '../controllers/adminAuth.controller.js';
import { protectAdmin } from '../middleware/authAdmin.middleware.js';

const router = express.Router();

router.post('/login', adminLoginController);
router.post('/logout', adminLogoutController);
router.get(
    "/check",
    protectAdmin,
    checkAdminAuthController
);
export default router;