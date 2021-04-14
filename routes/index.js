const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userController.signup);

router.post('/login', userController.login);

router.get('/users', userController.getAllUsers);

router.get('/users/:id', userController.getUserDetail);

module.exports = router;
