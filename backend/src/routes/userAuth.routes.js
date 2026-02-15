import express from 'express';
import { userLoginController, userLogoutController, userProfileController, userRegisterController } from '../controllers/userAuth.controller.js';
import { uploadAadhar } from '../middleware/upload.middleware.js';
import { protectUser } from '../middleware/userAuth.middleware.js';

const router = express.Router();

router.post(
    '/register',
    uploadAadhar.single("aadhar"),
    userRegisterController);
router.post('/login', userLoginController);
router.get('/logout', userLogoutController);

router.get('/profile', protectUser, userProfileController);
export default router;  