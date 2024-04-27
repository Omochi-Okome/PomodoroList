const express = require("express");

const router = express();

const signupRoutes = require("../controllers/signup");

router.post("/", signupRoutes.postSignup);

module.exports = router;