const express = require('express');
const router = express.Router();
// const passport = require('../passport');
const passport = require('passport');

const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/auth/facebook', passport.authenticate('facebook', {session: false}));

router.get('/auth/facebook/callback', userController.facebook_callback);

module.exports = router;