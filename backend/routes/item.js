var router = require('express').Router();
var createError = require('http-errors');
const itemController = require('../controllers/item-controller');

/* GET all items. */
router.get('/', function (req, res, next) {
  itemController.find({}).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err));
  });
});

/* GET an item by it's _id */
router.get('/:id', function (req, res, next) {
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
router.post('/', (req, res, next) => {
  itemController.createItem(req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err))
  });
});

/* DELETE an item by it's _id */
router.delete('/:id', (req, res, next) => {
  itemController.findOneAndDelete({
    _id: req.params.id
  }).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(500, err));
  });
});

module.exports = router;