import { Item } from '../constants/actions'
import { ItemAPI } from '../http-handler';

export const getAllItems = () => {
  return {
    type: Item.GET_ALL_ITEMS,
    payload: ItemAPI.getAll(),
  };
}

export const createItem = (data) => {
  return {
    type: Item.CREATE_ITEM,
    payload: ItemAPI.createItem(data),
  }
}