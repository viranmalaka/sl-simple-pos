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

// edit the order by id
// itemDetails = {itemID, quantity}
const editOrder = (id, itemDetails) => {
  return findById(id).then(dbOrder => {                 // find the order by the given _id
    if (dbOrder) { 
      // Found the order
      let alreadyInList = false;                      
      for (let x of dbOrder.items) { // check the given item is inside the order already
        if(x.item.toString() === itemDetails.itemId.toString()) {
          alreadyInList = true;
          x.quantity = itemDetails.quantity;
          return dbOrder.save();     // if so, update the data and save.
        }
      }
      if(!alreadyInList) {
        // the item is not in the order already, now add this item
        return itemController.findById(itemDetails.itemId).then(dbItem => {
          if(dbItem) {
            dbOrder.items.push( { // push to items array
              item: dbItem,
              quantity: itemDetails.quantity, 
            })
            return dbOrder.save(); // save
          } else {
            throw "Item Not Found"  // exception
          }
        });
      }
    } else {
      throw "Order Not Found" // exception
    }
  });
};

const deleteItemFromOrder = (orderId, itemId) => {
  return findById(orderId).then((dbOrder) => { // find the order by id
    if(dbOrder) {
      dbOrder.items = dbOrder.items.filter(x => x.item.toString() !== itemId); // filter the item array without the given item id
      return dbOrder.save(); // save
    } else {
      throw "Order Not Found"; // exception
    }
  })
};

const changeState = (orderId, newStatus) => {
  return findById(orderId).then(dbOrder => { // find the order by id
    if(dbOrder) {
      dbOrder.status = newStatus; // change the status
      return dbOrder.save();      // save
    } else {
      throw "Order Not Found";    // exception
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
