import { Order } from '../constants/actions';
import { OrderAPI } from '../http-handler';

export const getAllOrders = () => {
  return {
    type: Order.GET_ALL_ORDERS,
    payload: OrderAPI.getAll(),
  }
}

export const addItemToOrder = (orderId, itemId, quantity, allItems) => {
  return {
    type: Order.ADD_ITEM_TO_ORDER,
    payload: OrderAPI.addItemToOrder(orderId, itemId, quantity).then(result => { return {newOrder: result, allItems}}),
  }
}

export const createOrder = () => {
  return {
    type: Order.CREATE_ORDER,
    payload: OrderAPI.createOrder({status: 'pending'}),
  }
}

export const setCurrentOrder = (id, allItems) => {
  return {
    type: Order.SET_CURRENT_ORDER,
    payload: {orderId: id, allItems},
  }
}

export const setOrderStatus = (id, status) => {
  return {
    type: Order.SET_ORDER_STATUS,
    payload: OrderAPI.setOrderStatus(id, status),
  }
}

export const deleteItemFromOrder = (orderId, itemId, allItems) => {
  return {
    type: Order.DELETE_ITEM_FROM_ORDER,
    payload: OrderAPI.deleteItemFromOrder(orderId, itemId).then(result => {return {newOrder: result, allItems}}),
  }
}