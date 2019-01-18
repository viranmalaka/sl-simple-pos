var router = require('express').Router();
var createError = require('http-errors');
const userController = require('../controllers/user-controller');

const isAuthMiddleware = (req, res, next) => {
  const token = req.get('token');
  if (token) {
    userController.verifyToken(token, (user) => {
      if (user) {
        req.isAuthenticated = true;
        req.user = user;
      } else {
        req.isAuthenticated = false;
      }
      next();
    });
  } else {
    req.isAuthenticated = false;
    next();
  }
};

/* login. */
router.get('/test', isAuthMiddleware, (req, res, next) => {
  return res.jsonp({
    test: req.isAuthenticated,
    user: req.user
  });
});

router.post('/', (req, res, next) => {
  // TODO: validate body
  // find an user form this given username
  userController.createUser(req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err));
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
    next(createError(err));
  });
});

router.get('/logout', (req, res, next) => {
  res.jsonp({
    success: true
  });
});

module.exports = {
  router,
  isAuthMiddleware
};