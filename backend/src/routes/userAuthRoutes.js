import express from 'express';
import { userLoginController, userLogoutController } from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/login', userLoginController);
router.get('logout', userLogoutController);
export default router;  