const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUserDetail);

router.post('/users/others', userController.sendFriendRequest);

router.put('/users/others', userController.cancelFriendRequest);

router.put('/users/requests', userController.aceptFriendRequest);

router.get('/users/others/:id', userController.getNotFriends);

router.put('/users/friends', userController.deleteFriend);

router.post('/posts', postController.createPost);

router.get('/posts', postController.getAllPosts);

router.get('/posts/:id', postController.getPostDetail);

router.delete('/posts/:id', postController.deletePost);

router.put('/posts/:id', postController.editPost);

router.post('/comments', commentController.createComment);

router.get('/comments', commentController.getAllComments);

router.get('/comments/:id', commentController.getCommentDetail);

router.delete('/comments/:id', commentController.deleteComment);

router.put('/comments/:id', commentController.editComment);

module.exports = router;
