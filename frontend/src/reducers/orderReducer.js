import { Item, Order } from '../constants/actions'

const init = {
  allOrders: [],
  error: null,
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case Order.GET_ALL_ORDERS_FULFILLED:
      state = {
        ...state,
        allOrders: action.payload
      }
    case Order.GET_ALL_ORDERS_REJECT:
      state = {
        ...state,
        error: action.payload
      }
    default:
  }
  return state;
};

export default userReducer;