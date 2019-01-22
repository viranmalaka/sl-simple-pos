import { UI } from "../constants/actions";

const init = {
  sidebar: true,
  redirectTo: '',
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
    default:
  }
  return state;
};

export default UIStateReducer;