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