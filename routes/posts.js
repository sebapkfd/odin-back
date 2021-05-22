const express = require('express');
const router = express.Router();
const passport = require('passport');

const postController = require('../controllers/postController');

router.post('/', passport.authenticate("jwt", { session: false }), postController.createPost);

router.get('/', passport.authenticate("jwt", { session: false }), postController.getAllPosts);

router.get('/:id', passport.authenticate("jwt", { session: false }), postController.getPostDetail);

router.delete('/:id', passport.authenticate("jwt", { session: false }), postController.deletePost);

router.put('/:id', passport.authenticate("jwt", { session: false }), postController.editPost);

router.put('/:id/like', passport.authenticate("jwt", { session: false }), postController.likePost);

module.exports = router;