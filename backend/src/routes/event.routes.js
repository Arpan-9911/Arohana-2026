import { Router } from "express";
const router = Router();
import { createEventController, deleteEvent } from "../controllers/event.controller.js";
import { protectAdmin } from "../middleware/authAdmin.middleware.js";
import { requireSocietyAdmin } from "../middleware/societyAdmin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

router.post(
    "/",
    protectAdmin,
    requireSocietyAdmin,
    upload.single("banner_image"),
    createEventController
);
router.delete("/delete-event/:id",  deleteEvent);

export default router;
