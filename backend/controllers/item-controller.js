const Item = require('../models/item');

const create = (data) => {
    return new Item(data).save();
};

const find = (query, cb) => {
    return Item.find(query, cb);
};

const findById = (id, cb) => {
    return Item.findById(id, cb);
};

const findOneAndDelete = (query) => {
    return Item.findOneAndDelete(query);
};

module.exports = {
    create,
    find,
    findById,
    findOneAndDelete,
};