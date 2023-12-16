const express = require('express')

const router = express.Router();

const homeController = require('../controllers/home');

router.get('/',homeController.getHome);

router.post('/item',homeController.postItem);

router.post('/delete',homeController.deleteItem);

router.post('/editbutton',homeController.editButton);

router.post('/edit',homeController.editItem);

router.get('/archive',homeController.viewArchive);

router.post('/deleteArchive',homeController.deleteArchive);

router.post('/returnMain',homeController.returnMain);

module.exports = router;