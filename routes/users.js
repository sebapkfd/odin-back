const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.get('/', passport.authenticate("jwt", { session: false }), userController.getAllUsers);

router.get('/:id', passport.authenticate("jwt", { session: false }), userController.getUserDetail);

router.post('/others',passport.authenticate("jwt", { session: false }), userController.sendFriendRequest);

router.put('/others',passport.authenticate("jwt", { session: false }), userController.cancelFriendRequest);

router.get('/others/:id',passport.authenticate("jwt", { session: false }), userController.getNotFriends);

router.put('/requests',passport.authenticate("jwt", { session: false }), userController.aceptFriendRequest);

router.put('/friends',passport.authenticate("jwt", { session: false }), userController.deleteFriend);

module.exports = router;