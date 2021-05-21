const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/login', userController.login);

// router.get('/users', userController.getAllUsers);

// router.get('/users/:id', userController.getUserDetail);

// router.post('/users/others', userController.sendFriendRequest);

// router.put('/users/others', userController.cancelFriendRequest);

// router.put('/users/requests', userController.aceptFriendRequest);

// router.get('/users/others/:id', userController.getNotFriends);

// router.put('/users/friends', userController.deleteFriend);

module.exports = router;