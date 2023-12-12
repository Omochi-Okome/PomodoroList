const express = require('express')

const router = express.Router();

const homeController = require('../controllers/home');

router.get('/',homeController.getHome);

router.post('/item',homeController.postItem);

router.post('/delete',homeController.deleteItem);

router.post('/edit',homeController.editButton);

router.post('/change',homeController.editItem);

module.exports = router;