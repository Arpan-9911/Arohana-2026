import { Router } from "express";
const router = Router();
import { getAllEventsController, getEventByIdController } from "../controllers/event.controller.js";



router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);

export default router;
