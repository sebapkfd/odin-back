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
    .populate('likes')
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
            .populate('likes')
            .exec(callback);
        },
        postComments: (callback) => {
            Comment.find({'post': req.params.id})
            .populate('post') 
            .populate('user')
            .populate('likes')
            .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err)}
        if (results.postDetail === null) {
            let err = new Error('Post not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(results);
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
        likes: req.body.likes,
        _id: req.body.id
    })
    Post.findByIdAndUpdate(req.body.id, updatedPost, {}, (err) => {
        if (err) { return next(err) }
        res.json({msg: 'Post updated'})
    })
}

exports.likePost = (req, res, next) => {
    Post.findById(req.body.id)
    .exec((err, post) => {
        if (err) { return next(err)}
        if (post.likes.includes(req.body.user)) {
            post.likes.pull(req.body.user);
            post.save();
            res.json({msg: 'Like removed'});
        }
        else {
            post.likes.push(req.body.user);
            post.save();
            res.json({msg: 'Like added'});
        }
    })
}