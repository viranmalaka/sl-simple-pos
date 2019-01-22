import { Item } from '../constants/actions'

const init = {
  allItems: [],
  error: null,
  createError: null,
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case Item.GET_ALL_ITEMS_FULFILLED:
      state = {
        ...state,
        allItems: action.payload,
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
    case Item.GET_ALL_ITEMS_REJECT:
      state = {
        ...state,
        createError: action.payload
      }

    default:
  }
  return state;
};

export default userReducer;