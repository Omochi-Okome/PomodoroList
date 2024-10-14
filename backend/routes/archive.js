import express from "express";
import { archiveController } from "../controllers/archive.js";

const router = express.Router();

router.get("/", archiveController.viewArchive);

router.post("/delete", archiveController.deleteArchiveTodoItem);

router.post("/returnHome", archiveController.returnHome);

export default router;
