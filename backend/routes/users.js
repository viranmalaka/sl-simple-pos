var express = require('express');
var router = express.Router();
var User = require('../models/user');
var createError = require('http-errors');
var jwt = require('jsonwebtoken');

const SECRET = 'shhhhh';

const isAuth = (req, res, next) => {
  const token = req.get('token');
  if(token){
    jwt.verify(token, SECRET, (err, data) => {
      if(err) {
        req.isAuthenticated = false;
      } else {
        req.isAuthenticated = true;
        req.user = data;
      }
      next();
    });
  } else {
    req.isAuthenticated = false;
    next();
  }
}

/* login. */
router.get('/test', isAuth, (req, res, next) => {
  res.jsonp({test: 'ok'})
});

router.post('/', (req, res, next) => {
  // TODO validate body
  // find an user form this given username
  User.findOne({username: req.body.username}, (err, getUser) => {
    if(err)
      return next(err);
    if(getUser) // generate an error
      return next(createError('username already exist'));
    
    // create new user
    User.createUser(new User(req.body), (err, newUser) => {
        if(err) {
          next(err);
        } else {
          delete newUser['password'];
          delete newUser['_v'];
          res.jsonp(newUser);
        }
      });
  });
});

router.post('/login', (req, res, next) => {
  // TODO validate body
  User.findOne({username: req.body.username}).select('+password').exec((err, getUser) => {
    if(err) 
      return next(err);
    if(!getUser) 
      return next(createError(404, 'user not found'))
    
    User.comparePassword(req.body.password, getUser.password, (err, isMatch) => {
      if(err) 
        return next(createError(500, 'Something went wrong'));
      if(isMatch) {
        jwt.sign(getUser._doc, SECRET, {expiresIn: '1m'}, (err, token) => {
          console.log(err);
          res.jsonp({success: true, token: token});
        });
      } else {
        return next(createError(401, 'Password not matched'))
      }
    });
  });
});

router.get('/logout', (req, res, next) => {
  res.jsonp({success: true});
});

module.exports = router;
