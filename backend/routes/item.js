var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var createError = require('http-errors');

/* GET index. */
router.get('/', function (req, res, next) {
    findItem({}, (err, items) => {
        if (err)
            return next(err);
        res.jsonp(items);
    });
});

router.get('/:id', function (req, res, next) {
    findById(req.params.id, (err, item) => {
        if (err)
            return next(err);
        if (!item)
            return next(createError(404, 'Not Found'));
        res.jsonp(item);
    });
});

router.post('/', (req, res, next) => {
    createItem(req.body, (err, newItem) => {
        if (err)
            return next(err);
        res.jsonp(newItem);
    })
});

router.delete('/:id', (req, res, next) => {
    Item.findOneAndDelete({ _id: req.params.id }, (err, data) => {
        if (err) {
            return next(createError(err));
        }
        res.jsonp(data)
    });
});

module.exports = router;
