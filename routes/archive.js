const express = require('express');

const archiveRoutes = require('../controllers/archive');

const router = express.Router();

router.get('/',archiveRoutes.viewArchive);

router.post('/delete',archiveRoutes.deleteArchive);

router.post('/returnMain',archiveRoutes.returnMain);

module.exports = router;