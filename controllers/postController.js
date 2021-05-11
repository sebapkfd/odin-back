const Post = require('../models/post');
const Comment = require('../models/comment');
const async = require('async');

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
    .populate('user')
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.getPostDetail = (req, res, next) => {
    async.parallel({
        postDetail: (callback) => {
            Post.findById(req.params.id)
            .populate('user')
            .exec(callback);
        },
        postComments: (callback) => {
            Comment.find({'post': req.params.id})
            .sort({'timestamp':'Ascending'})
            .populate('post') 
            .populate('user')
            .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err)}
        if (results.postDetail === null) {
            let err = new Error('Post not found');
            err.status = 404;
            return next(err);
        }
        const {postDetail, postComments} = results;
        res.status(200).json({postDetail, postComments});
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