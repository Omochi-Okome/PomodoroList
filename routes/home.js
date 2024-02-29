const express = require("express");

const router = express.Router();

const homeController = require("../controllers/home");



router.post("/item", homeController.postItem);

router.post("/delete", homeController.deleteItem);

router.post("/editbutton", homeController.editButton);

router.post("/edit", homeController.posteditedItem);

module.exports = router;
