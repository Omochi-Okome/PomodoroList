const express = require("express");

const router = express.Router();

const loginController = require("../controllers/login");

router.get("/",loginController.getLoginForm);

router.post("/check",loginController.checkInformation);

module.exports = router;