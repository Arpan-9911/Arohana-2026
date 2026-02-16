import express from 'express';
import { reuploadDocumentsController, userLoginController, userLogoutController, userProfileController, userRegisterController } from '../controllers/userAuth.controller.js';
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

router.patch(
    "/reupload-documents",
    protectUser,
    upload.fields([
        { name: "aadhar_image", maxCount: 1 },
        { name: "idcard_image", maxCount: 1 },
    ]),
    reuploadDocumentsController
);


router.post('/logout', userLogoutController);

router.get('/profile', protectUser, userProfileController);
export default router;  