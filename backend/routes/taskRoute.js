import express from "express";
import { taskController } from "../controllers/taskController.js";

const router = express.Router();

router.post("/postNewTask", taskController.postNewTask);

router.post("/delete", taskController.deleteTask);

router.post("/deleteArchiveTask", taskController.deleteArchiveTask);

router.post("/returnTask", taskController.returnTask);

export default router;
