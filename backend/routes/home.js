const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home");
const auth = require("../middleware/auth");

router.get("/", auth,homeController.getHome);

router.post("/item",auth, homeController.postItem);

router.post("/delete", auth, homeController.deleteItem);

router.post("/countUpPomodoroCount", auth, homeController.countUpPomodoroCount)

module.exports = router;
