const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/login",authController.checkInformation);

router.post("/singup", authController.postSignup);

router.post("/logout",authController.postLogout);

module.exports = router;