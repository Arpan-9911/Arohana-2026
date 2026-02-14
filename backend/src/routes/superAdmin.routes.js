import express from "express";
import { createSocietyController } from "../controllers/superAdmin.controller.js";
import { protectAdmin } from "../middleware/authAdmin.middleware.js";
import { requireSuperAdmin } from "../middleware/superAdmin.middleware.js";

const router = express.Router();

router.post(
    "/create-society",
    protectAdmin,
    requireSuperAdmin,
    createSocietyController
);

export default router;
