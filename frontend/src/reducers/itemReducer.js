import { Item } from '../constants/actions'

const init = {
  allItems: [],
  itemsById: {},
  error: null,
  createError: null,
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case Item.GET_ALL_ITEMS_FULFILLED:
      let obj = {};
      action.payload.forEach(x => {
        obj[x._id] = x;
      })
      state = {
        ...state,
        allItems: action.payload,
        itemsById: obj,
        error: null,
      }
      break;
    case Item.GET_ALL_ITEMS_REJECT:
      state = {
        ...state,
        error: action.payload
      }
      break;

    case Item.CREATE_ITEM_FULFILLED:
      state = {
        ...state,
        allItems: [...state.allItems, action.payload],
      }
      break
    case Item.CREATE_ITEM_REJECT:
      state = {
        ...state,
        createError: action.payload
      }
      break;
    default:
  }
  return state;
};

export default userReducer;