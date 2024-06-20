const express = require('express');

const router = express.Router();

const archiveRoutes = require('../controllers/archive');

router.get('/', archiveRoutes.viewArchive);

router.post('/delete', archiveRoutes.deleteArchiveTodoItem);

router.post('/returnHome',archiveRoutes.returnHome);

module.exports = router;