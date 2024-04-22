const express = require("express");

const archiveRoutes = require("../controllers/archive");

const router = express.Router();

router.get("/", archiveRoutes.viewArchive);

router.post("/delete", archiveRoutes.deleteArchiveTodoItem);

module.exports = router;
