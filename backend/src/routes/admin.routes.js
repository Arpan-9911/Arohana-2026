import express from "express";
import { approveUserController, createEventController, createSocietyController, deleteEventController, getSocietyEventsController, rejectUserController } from "../controllers/admin.controller.js";
import { protectAdmin } from "../middleware/authAdmin.middleware.js";
import { requireSuperAdmin } from "../middleware/superAdmin.middleware.js";
import { requireSocietyAdmin } from "../middleware/societyAdmin.middleware.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/create-society",
    protectAdmin,
    requireSuperAdmin,
    createSocietyController
);
router.get(
    "/events",
    protectAdmin,
    requireSocietyAdmin,
    getSocietyEventsController
);
router.post(
    "/events",
    protectAdmin,
    requireSocietyAdmin,
    upload.single("banner_image"),
    createEventController
);
router.delete(
    "/events/:id",
    protectAdmin,
    requireSocietyAdmin,
    deleteEventController
);
router.patch(
    "/users/:id/approve",
    protectAdmin,
    requireSuperAdmin,
    approveUserController
);
router.patch(
    "/users/:id/reject",
    protectAdmin,
    requireSuperAdmin,
    rejectUserController
);
export default router;
