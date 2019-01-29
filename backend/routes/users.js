var router = require('express').Router();
var createError = require('http-errors');
const userController = require('../controllers/user-controller');

const isAuthMiddleware = (req, res, next) => { // an middleware for check the token
  const token = req.get('token'); // get the token data from the headder
  if (token) {
    userController.verifyToken(token, (user) => {
      if (user) {
        req.isAuthenticated = true;
        req.user = user; // valid token
      } else {
        req.isAuthenticated = false;
      }
      next();
    });
  } else {
    res.status(401);
    res.jsonp({
      error: {
        message: 'Forbidden' // exception. request is end.
      }
    });
  }
};

/* login. */
router.get('/check-token', isAuthMiddleware, (req, res, next) => {
  return res.jsonp({
    test: req.isAuthenticated,
    user: req.user
  });
});

router.post('/', (req, res, next) => {
  // find an user form this given username
  userController.createUser(req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err[0], err[1]));
  });
});

router.post('/login', (req, res, next) => {
  // TODO validate body
  userController.login(req.body).then((token) => {
    res.jsonp({
      token: token,
      success: true
    });
  }).catch((err) => {
    next(createError(err[0], err[1]));
  });
});

router.get('/logout', isAuthMiddleware, (req, res, next) => {
  res.jsonp({
    success: true
  });
});

router.delete('/:id', isAuthMiddleware, (req, res, next) => {
  userController.findOneAndDelete({
    _id: req.params.id
  }).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err));
  });
});

module.exports = {
  router,
  isAuthMiddleware
};