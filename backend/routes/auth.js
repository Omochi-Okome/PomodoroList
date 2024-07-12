const express = require('express');

const router = express.Router();

const authRoutes = require('../controllers/auth');

router.get('/login', authRoutes.getLoginForm);

router.post('/login', authRoutes.postLoginForm);

router.get('/signup', authRoutes.getSignUpForm);

router.post('/signup', authRoutes.postSignUpForm);

module.exports = router;