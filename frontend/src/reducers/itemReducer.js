import { Item } from '../constants/actions'

const init = {
  allItems: [],   // keeps all items
  itemsById: {},  // keeps all items by its id
  error: null,    // fetch errors
  createError: null, // create errors
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case Item.GET_ALL_ITEMS_FULFILLED: // returns a promise (then)
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
    case Item.GET_ALL_ITEMS_REJECT: // returns a promise (catch)
      state = {
        ...state,
        error: action.payload
      }
      break;

    case Item.CREATE_ITEM_FULFILLED: // returns a promise (then)
      state = {
        ...state,
        allItems: [...state.allItems, action.payload],
      }
      break
    case Item.CREATE_ITEM_REJECT: // returns a promise (catch)
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