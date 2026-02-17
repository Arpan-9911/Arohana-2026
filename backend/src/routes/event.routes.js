import { Router } from "express";
const router = Router();
import { createTeamController, getAllEventsController, getEventByIdController, participateSoloController, submitController } from "../controllers/event.controller.js";
import { protectUser } from "../middleware/userAuth.middleware.js";



router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post(
    "/:eventId/participate",
    protectUser,
    participateSoloController
);

router.post(
    "/:eventId/create-team",
    protectUser,
    createTeamController
);

router.post(
    "/:eventId/submit",
    protectUser,
    submitController
);

export default router;
