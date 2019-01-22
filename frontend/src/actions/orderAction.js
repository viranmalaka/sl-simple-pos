import { Order } from '../constants/actions';
import { OrderAPI } from '../http-handler';

export const getAllOrders = () => {
  return {
    type: Order.GET_ALL_ORDERS,
    payload: OrderAPI.getAll(),
  }
}
