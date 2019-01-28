const Order = require('../models/order');
const itemController = require('./item-controller');

const create = (data) => {
  return new Order(data).save();
};
const find = (query) => {
  return Order.find(query);
};
const findById = (id) => {
  return Order.findById(id);
};

const deleteById = (id) => {
  return Order.findOneAndDelete({
    _id: id
  });
};

const editOrder = (id, order) => {
  return findById(id).then(dbOrder => {
    if (dbOrder) {
      let alreadyInList = false;
      for (let x of dbOrder.items) {
        if(x.item.toString() === order.itemId.toString()) {
          alreadyInList = true;
          x.quantity = order.quantity;
          return dbOrder.save();
        }
      }
      if(!alreadyInList) {
        return itemController.findById(order.itemId).then(dbItem => {
          if(dbItem) {
            dbOrder.items.push( {
              item: dbItem,
              quantity: order.quantity, 
            })
            return dbOrder.save();
          } else {
            throw "Item Not Found"
          }
        });
      }
    } else {
      throw "Order Not Found"
    }
  });
};

const deleteItemFromOrder = (orderId, itemId) => {
  return findById(orderId).then((dbOrder) => {
    if(dbOrder) {
      dbOrder.items = dbOrder.items.filter(x => x.item.toString() !== itemId);
      return dbOrder.save();
    } else {
      throw "Order Not Found";
    }
  })
};

const changeState = (orderId, newStatus) => {
  return findById(orderId).then(dbOrder => {
    if(dbOrder) {
      dbOrder.status = newStatus;
      return dbOrder.save();
    } else {
      throw "Order Not Found";
    }
  });
};

module.exports = {
  create,
  find,
  findById,
  editOrder,
  deleteItemFromOrder,
  deleteById,
  changeState
};
