import { Router } from "express";
const router = Router();
import { createEvent, deleteEvent } from "../controllers/event.controller.js";

router.post("/create-event", createEvent);
router.delete("/delete-event/:id",  deleteEvent);

export default router;
