var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/form-demo');
var Users = db.get('users');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.post('/', function(req, res, next) {

  var errors = [];
  if(req.body.email.length === 0) {
    errors.push('Email cannot be blank');
  }
  if (!req.body.email.match("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")){
    errors.push("Email is not valid email.");
  }
  if (req.body.password.length == 0) {
    errors.push("Password cannot be blank");
  }
  if (req.body.password != req.body.password_confirmation) {
    errors.push("Password and Password confirmation must match");
  } 
  if (req.body.password.length < 6) {
    errors.push("Password must be a minimum of 6 characters");
  }
  if (errors.length) {
    res.render('index', {errors: errors})
  }
  else {
    var password = req.body.password.trim();
    var hash = bcrypt.hashSync(password, 12);
    email = req.body.email.toLowerCase();
    Users.findOne({email: email}, function (err, data) {
      if(data) {
        errors.push('Email already in use');
        res.render('index', {errors: errors})
      }
      else {
        Users.insert({email: email, passwordDigest: hash}, function (err, data) {
          req.session.username = email;
          res.redirect('/users/login');
        });
      }
    });
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  
  var errors = [];
  if (req.body.email.length == 0) {
    errors.push("Email cannot be blank");
  }
  if (req.body.password.length == 0) {
    errors.push("Password cannot be blank");
  }
  if (errors.length) {
    res.render('login', {errors: errors})
  }
  else {
    var email = req.body.email.trim().toLowerCase();
    Users.findOne({email: email}, function (err, data) {
      if (data) {
        if (bcrypt.compareSync(req.body.password, data.passwordDigest)) {
          req.session.username = req.body.email;
          res.redirect('/dashboard');
        }
        else {
          errors.push("Invalid email / password");
          res.render('login', {errors: errors});
        }
      } else {
        errors.push('Invalid email / password');
        res.render('login', {errors: errors});
      } 
    });
  }
});











module.exports = router;
