var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/form-demo');
var Users = db.get('users');
var bcrypt = require('bcrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Builder' });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', { username: req.session.username });
});

router.get('/dashboard/comp-options', function(req, res, next) {
  res.render('comp-options', { username: req.session.username });
});

router.get('/signout', function(req, res, next) {
  req.session.username = null;
  res.redirect('/');
});
  
module.exports = router;
