const Item = require('../models/item');

const test = () => {
    return {};
}

const create = (data) => {
    return new Item(data).save();
};

const find = (query) => {
    return Item.find(query);
};

const findById = (id) => {
    return Item.findById(id);
};

const findOneAndDelete = (query) => {
    return Item.findOneAndDelete(query);
};

module.exports = {
    create,
    find,
    findById,
    findOneAndDelete,
    test
};