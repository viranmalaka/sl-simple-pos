var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Item = require('../models/item');
var createError = require('http-errors');

const createOrder = (data, cb) => {
    new Order(data).save(cb);
}
const findOrder = (query, cb) => {
    Order.find(query, cb);
}
const findById = (id, cb) => {
    Order.findById(id, cb);
}

/* GET index. */
router.get('/', function (req, res, next) {
    findOrder({}, (err, orders) => {
        if (err)
            return next(err);
        res.jsonp(orders)
    });
});

router.get('/:id', function (req, res, next) {
    findById(req.params.id, (err, order) => {
        if (err)
            return next(err);
        if(!order)
            return next(createError(404, 'Not Found')); 
        res.jsonp(order)
    });
});

router.post('/', (req, res, next) => {
    createOrder(req.body, (err, newOrder) => {
        if (err)
            return next(err);
        res.jsonp(newOrder);
    })
});

router.put('/add-item/:orderId', (req, res, next) => {
    findById(req.params.orderId, (err, order) => {
        if(err) {
            return next(createError(err));
        }
        if(!order) {
            return next(createError(404, 'Not Found'));
        }

        let saveOrder = () => {
            order.save((err3, savedOrder) => {
                res.jsonp({success: true, order: savedOrder});
            });
        }

        let alreadyInList = false;
        order.items.forEach(x => {
            if (x.item.toString() === req.body.itemId) {
                alreadyInList = true;
                x.quantity = req.body.quantity;
                saveOrder();
            }
        });
        if(!alreadyInList) {
            Item.findById(req.body.itemId, (err2, item) => {
                if(!item) {
                    next(createError(404, 'Not Found'));
                } else {
                    order.items.push({
                        item: item, 
                        quantity: req.body.quantity
                    });
                    saveOrder();
                }
            });
        }
    });
});

router.delete('/:orderId/delete-item/:itemId', (req, res, next) => {
    findById(req.params.orderId, (err, order) => {
        if(err) {
            return next(createError(err));
        }
        if(!order) {
            return next(createError(404, 'Not Found'));
        }

        order.items = order.items.filter(x => {
            console.log(x.item.toString());
            return x.item.toString() === req.params.itemId
        });

        order.save((err2, newOrder) => {
            res.jsonp(newOrder);
        })
    });
    
});

router.delete('/:id', (req, res, next) => {
    Order.findOneAndDelete({_id: req.params.id}, (err, data) => {
        if(err) {
            return next(createError(err));
        }
        res.jsonp(data)
    });
});

module.exports = router;
