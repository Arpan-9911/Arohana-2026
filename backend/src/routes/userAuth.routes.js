import express from 'express';
import { userLoginController, userLogoutController, userProfileController, userRegisterController } from '../controllers/userAuth.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { protectUser } from '../middleware/userAuth.middleware.js';

const router = express.Router();

router.post(
    '/register',
    upload.fields([
        { name: "aadhar_image", maxCount: 1 },
        { name: "idcard_image", maxCount: 1 },
    ]),
    userRegisterController);
router.post('/login', userLoginController);
router.get('/logout', userLogoutController);

router.get('/profile', protectUser, userProfileController);
export default router;  