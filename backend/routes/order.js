var express = require('express');
var router = express.Router();
var createError = require('http-errors');

var orderController = require('../controllers/order-controller');
const authMiddleware = require('./users').isAuthMiddleware;

/* GET index. */
router.get('/', authMiddleware, (req, res, next) => {
  orderController.find({}).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err));
  });
});

router.get('/:id', authMiddleware, (req, res, next) => {
  orderController.findById(req.params.id).then((result) => {
    if (result) {
      res.jsonp(result);
    } else {
      next(createError(404, 'Not Found'));
    }
  }).catch((err) => {
    next(createError(500, err));
  });
});

router.post('/', authMiddleware, (req, res, next) => {
  // TODO: validate the request data 
  orderController.create(req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err));
  });
});

router.delete('/:id', (req, res, next) => {
  orderController.deleteById(req.params.id).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(data));
  });
});

/* Add item to an order */
router.put('/add-item/:orderId', (req, res, next) => {
  orderController.editOrder(req.params.orderId, req.body).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err));
  });
});

router.put('/change-status/:orderId', (req, res, next) => {
  orderController.changeState(req.params.orderId, req.body.status).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err));
  });
});

router.delete('/:orderId/delete-item/:itemId', (req, res, next) => {
  orderController.deleteItemFromOrder(req.params.orderId, req.params.itemId).then((result) => {
    res.jsonp(result);
  }).catch((err) => {
    next(createError(err));
  });
});



module.exports = router;