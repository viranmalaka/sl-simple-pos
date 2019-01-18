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
  return new Promise((resolve, reject) => {
    findById(id).then(dbOrder => {
      if(dbOrder) {
        let alreadyInList = false;
        dbOrder.items.forEach(x => {
          if (x.item.toString() === order.itemId) {
            alreadyInList = true;
            x.quantity = order.quantity;
            dbOrder.save().then((result) => {
              return resolve(result);
            }).catch((err) => {
              reject(err);
            });
          }
        });
        if(!alreadyInList) {
          itemController.findById(order.itemId).then((dbItem) => {
            order.items.push({
              item: dbItem,
              quantity: order.quantity
            });
            dbOrder.save().then((result) => {
              return resolve(result);
            }).catch((err) => {
              reject(err);
            });
          }).catch((err) => {
            resolve(err);
          });          
        }
      } else {
        reject('Not found');
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

const deleteItemFromOrder = (orderId, itemId) => {
  return new Promise((resolve, reject) => {
    findById(orderId).then((dbOrder) => {
      if(dbOrder) {
        dbOrder.items = dbOrder.items.filter(x => x.item.toString() === itemId);
        dbOrder.save().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      } else {
        reject('Not Found');
      }
    }).catch((err) => {
      reject(err);
    });
  });
};


module.exports = {
  create,
  find,
  findById,
  editOrder,
  deleteItemFromOrder,
  deleteById,
};
