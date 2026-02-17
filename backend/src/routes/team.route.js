import express from 'express';
import { joinTeamController } from '../controllers/team.controller.js';
import { protectUser } from '../middleware/userAuth.middleware.js';

const router = express.Router();

router.post(
    "/join",
    protectUser,
    joinTeamController
);


export default router;