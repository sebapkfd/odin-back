const Post = require('../models/post');

exports.createPost = (req, res, next) => {
    const newPost = new Post({
        text: req.body.text,
        user: req.body.user
    })
    newPost.save((err) => {
        if (err) { return next(err)}
        res.status(200).json({msg: 'Post sucessfully added'})
    })
}

exports.getAllPosts = (req, res, next) => {
    Post.find({})
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.getPostDetail = (req, res, next) => {
    Post.findById(req.params.id)
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.deletePost = (req, res, next) => {
    Post.findByIdAndRemove(req.body.id)
    .exec((err) => {
        if (err) {return next(err)}
        res.json({msg: 'Post deleted'})
    })
}

exports.editPost = (req, res, next) => {
    const updatedPost = new Post({
        text: req.body.text,
        user: req.body.user,
        _id: req.body.id
    })
    Post.findByIdAndUpdate(req.body.id, updatedPost, {}, (err) => {
        if (err) { return next(err) }
        res.json({msg: 'Post updated'})
    })
}