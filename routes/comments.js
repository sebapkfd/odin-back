const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.post('/', commentController.createComment);

router.get('/', commentController.getAllComments);

router.get('/:id', commentController.getCommentDetail);

router.delete('/:id', commentController.deleteComment);

router.put('/:id', commentController.editComment);

router.put('/:id/like', commentController.likeComment);

module.exports = router;