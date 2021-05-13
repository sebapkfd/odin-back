const User = require('../models/user');
const Post = require('../models/post');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const async = require('async');
const {secret}=  require('../info');

exports.signup = (req, res, next) => {
    User.findOne({ 'email': req.body.email})
    .exec((err, foundUSer) => {
        if (err) { return next(err)}
        if (foundUSer) {
            return res.json({ msg: 'Can not use this email'})
        }
        else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
            });
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) { return next(err)}
                newUser.set('password', hash);
                newUser.save( err => {
                    if (err) { return next(err)}
                    res.status(200).json({
                        msg: 'Register succesfully',
                        user: newUser.user
                    })
                })
            })
        }
    })
}

exports.login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({ msg: 'Something went wrong' });
        }
        req.login(user, { session: false }, (error) => {
            if (error) res.send(error);
            const token = jwt.sign({ user }, secret, {
                expiresIn: '1d',
            });
            let data = { _id: user._id, email: user.email};
            return res.json({ user: data, token });
        });
    })(req, res);
}

exports.getAllUsers = (req, res, next) => {
    User.find({})
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.getUserDetail = (req, res, next) => {
    async.parallel({
        userDetail: (callback) => {
            User.findById(req.params.id)
            .exec(callback);
        },
        userPosts: (callback) => {
            Post.find({'user': req.params.id})
            .populate('user')
            .exec(callback);
        }
    }, (err, results) => {
        if (err) { return next(err)}
        if (results.userDetail === null) {
            let err = new Error('Post not found');
            err.status = 404;
            return next(err);
        }
        res.status(200).json(results)
    })
}

exports.getOtherUsers = (req, res, next) => {
    User.find({'_id': {$ne: req.params.id}})
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}

exports.sendFriendRequest = (req, res, next) => {
    User.findByIdAndUpdate(req.body.receiver, { $push: { friendRequests: req.body.sender } }, (err) => {
        if (err) {return next(err)}
        res.json({msg: 'Friend request sent'})
    })
}

exports.cancelFriendRequest = (req, res, next) => {
    User.findByIdAndUpdate(req.body.receiver, { $pull: { friendRequests: req.body.sender } }, (err) => {
        if (err) {return next(err)}
        res.json({msg: 'Friend request removed'})
    })
}
