import express from "express";
import { dashboardController } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/task", dashboardController.getTask);

router.get("/archiveTask", dashboardController.getArchiveTask);

export default router;
