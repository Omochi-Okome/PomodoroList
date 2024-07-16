const express = require('express');

const router = express.Router();

const archiveController = require('../controllers/archive');

router.get('/', archiveController.viewArchive);

router.post('/delete', archiveController.deleteArchiveTodoItem);

router.post('/returnHome',archiveController.returnHome);

module.exports = router;