const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentController = require('../controllers/commentController');

router.post('/', passport.authenticate("jwt", { session: false }), commentController.createComment);

router.get('/', passport.authenticate("jwt", { session: false }), commentController.getAllComments);

router.get('/:id', passport.authenticate("jwt", { session: false }), commentController.getCommentDetail);

router.delete('/:id', passport.authenticate("jwt", { session: false }), commentController.deleteComment);

router.put('/:id', passport.authenticate("jwt", { session: false }), commentController.editComment);

router.put('/:id/like', passport.authenticate("jwt", { session: false }), commentController.likeComment);

module.exports = router;