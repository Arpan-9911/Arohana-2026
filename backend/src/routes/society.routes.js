import express from "express";
import { getSocietiesController } from "../controllers/society.controller.js";

const router = express.Router();

router.get("/", getSocietiesController);

export default router;