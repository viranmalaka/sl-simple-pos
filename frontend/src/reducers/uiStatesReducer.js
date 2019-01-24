import { UI } from "../constants/actions";

const init = {
  sidebar: true,
  redirectTo: '',
  path: '',
  showAllOrders: false,
}

const UIStateReducer = (state = init, action) => {
  switch (action.type) {
    case UI.SIDEBAR_TOGGLE:
      state = {
        ...state,
        sidebar: !state.sidebar
      };
      break;
    case UI.REDIRECT:
      state = {
        ...state,
        redirectTo: action.payload,
      }
      break;
    case UI.CHANGE_PATH:
      state = {
        ...state,
        path: action.payload
      }
      break;
    case UI.ALL_ORDERS:
      state = {
        ...state,
        showAllOrders: action.payload
      }
      break;
    default:
  }
  return state;
};

export default UIStateReducer;