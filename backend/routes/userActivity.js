const express = require('express');

const router = express();

const userActivityController = require('../controllers/userActivity');

router.get('/',userActivityController.getData);

router.post('/signupData',userActivityController.postSignUpData);

router.post('/loginData', userActivityController.postLoginData);

router.post('/addTodoData', userActivityController.postAddTodoData);

router.post('/completeTodoData', userActivityController.postCompleteTodoData);

router.post('/completePomodoroData', userActivityController.postCompletePomodoroData);

module.exports = router;