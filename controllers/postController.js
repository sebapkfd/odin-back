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