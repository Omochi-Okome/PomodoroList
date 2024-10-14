import express from "express";
import { homeController } from "../controllers/home.js";

const router = express.Router();

router.get("/", homeController.getHome);

router.post("/item", homeController.postItem);

router.post("/delete", homeController.deleteItem);

export default router;