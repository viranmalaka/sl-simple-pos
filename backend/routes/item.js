var router = require('express').Router();
var createError = require('http-errors');
const itemController = require('../controllers/item-controller');
const authMiddleware = require('./users').isAuthMiddleware;

/* GET all items. */
router.get('/', authMiddleware, (req, res, next) => {
  itemController.find({}).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err));
  });
});

/* GET an item by it's _id */
router.get('/:id', authMiddleware, (req, res, next) => {
  itemController.findById(req.params.id).then((result) => {
    if (result) {
      res.jsonp(result);
    } else {
      next(createError(404, 'Not Found'));
    }
  }).catch((err) => {
    next(createError(500, err));
  });
});

/* POST create and item */
router.post('/', authMiddleware, (req, res, next) => {
  itemController.create(req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err))
  });
});

/* DELETE an item by it's _id */
router.delete('/:id', authMiddleware, (req, res, next) => {
  itemController.findOneAndDelete({
    _id: req.params.id
  }).then((result) => {
    if(result) {
      res.jsonp(result);
    } else {
      next(createError(401, 'Not Found'));
    }
  }).catch((err) => {
    next(createError(500, err));
  });
});

module.exports = router;