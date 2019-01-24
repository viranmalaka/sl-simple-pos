import { Order } from '../constants/actions'

const init = {
  allOrders: [],
  error: null,
  currentOrder: null,
};

const orderProcess = (order, allItems) => {
  let totCost = 0;
  let totQty = 0;
  order.items.forEach(i => {
    totCost += i.quantity * allItems[i.item].unitPrice;
    totQty += i.quantity
  });
  return {
    ...order,
    totCost,
    totQty
  }
}

const userReducer = (state = init, action) => {
  switch (action.type) {
    case Order.GET_ALL_ORDERS_FULFILLED:
      state = {
        ...state,
        allOrders: action.payload
      }
      break;
    case Order.GET_ALL_ORDERS_REJECT:
      state = {
        ...state,
        error: action.payload
      }
      break;

    case Order.ADD_ITEM_TO_ORDER_FULFILLED:
      state = {
        ...state,
        currentOrder: orderProcess(action.payload.newOrder, action.payload.allItems),
      }
      break;

    case Order.CREATE_ORDER_FULFILLED:
      state = {
        ...state,
        allOrders: [...state.allOrders, action.payload]
      }
      break;

    case Order.SET_CURRENT_ORDER:
      const order = state.allOrders.filter(o => o._id === action.payload.orderId)[0];
      state = {
        ...state,
        currentOrder: orderProcess(order, action.payload.allItems),
      }
      break;
    case Order.DELETE_ITEM_FROM_ORDER_FULFILLED:
      console.log(action.payload); state = {
        ...state,
        currentOrder: orderProcess(action.payload.newOrder, action.payload.allItems),
      }
      break;

    case Order.SET_ORDER_STATUS_FULFILLED:
      state = {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          status: action.payload.status
        }
      }
      break;
    default:
  }
  return state;
};

export default userReducer;