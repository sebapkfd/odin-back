const Comment = require('../models/comment');

exports.createComment = (req, res, next) => {
    const newComment = new Comment({
        text: req.body.text,
        user: req.body.user,
        post: req.body.post
    })
    newComment.save((err) => {
        if (err) { return next(err)}
        res.status(201).json({msg: 'Comment sucessfully added'})
    })
}

exports.getAllComments = (req, res, next) => {
    Comment.find({})
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.getCommentDetail = (req, res, next) => {
    Comment.findById(req.params.id)
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.deleteComment = (req, res, next) => {
    Comment.findByIdAndRemove(req.body.id)
    .exec((err) => {
        if (err) {return next(err)}
        res.status(200).json({msg: 'Comment deleted'})
    })
}

exports.editComment = (req, res, next) => {
    const updatedComment = new Comment({
        text: req.body.text,
        user: req.body.user,
        post: req.body.post,
        likes: req.body.likes,
        _id: req.body.id
    })
    Comment.findByIdAndUpdate(req.body.id, updatedComment, {}, (err) => {
        if (err) { return next(err) }
        res.status(201).json({msg: 'Comment updated'})
    })
}

exports.likeComment = (req, res, next) => {
    Comment.findById(req.body.id)
    .exec((err, comment) => {
        if (err) { return next(err)}
        if (comment.likes.includes(req.body.user)) {
            comment.likes.pull(req.body.user);
            comment.save();
            res.status(201).json({msg: 'Like removed'});
        }
        else {
            comment.likes.push(req.body.user);
            comment.save();
            res.status(201).json({msg: 'Like added'});
        }
    }) 
}