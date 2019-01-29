
// Actions for items

import { Item } from '../constants/actions'
import { ItemAPI } from '../http-handler';

export const getAllItems = () => {
  return {
    type: Item.GET_ALL_ITEMS,
    payload: ItemAPI.getAll(),         // api calls (promise)
  };
}

export const createItem = (data) => {
  return {
    type: Item.CREATE_ITEM,
    payload: ItemAPI.createItem(data), // api calls (promise)
  }
}