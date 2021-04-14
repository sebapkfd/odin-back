const User = require('../models/user');

const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    User.findById(req.params.id)
    .exec((err, result) => {
        if (err) { return next(err)}
        else{
            res.status(200).json(result)
        }
    })
}