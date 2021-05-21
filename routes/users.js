const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserDetail);

router.post('/others', userController.sendFriendRequest);

router.put('/others', userController.cancelFriendRequest);

router.get('/others/:id', userController.getNotFriends);

router.put('/requests', userController.aceptFriendRequest);

router.put('/friends', userController.deleteFriend);

module.exports = router;