import { getMyParticipationsController } from "../controllers/user.controller.js";
import { userProfileController } from "../controllers/userAuth.controller.js";
import { protectUser } from "../middleware/userAuth.middleware.js";
import express from 'express';

const router = express.Router();

router.get('/me/participations', protectUser, getMyParticipationsController );

export default router;