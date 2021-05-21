const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');


router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostDetail);

router.delete('/:id', postController.deletePost);

router.put('/:id', postController.editPost);

router.put('/:id/like', postController.likePost);

module.exports = router;