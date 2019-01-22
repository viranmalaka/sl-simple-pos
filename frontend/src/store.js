import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import order from "./reducers/orderReducer";
import user from "./reducers/userReducer";
import ui from "./reducers/uiStatesReducer";
import item from "./reducers/itemReducer";

import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(
  combineReducers({
    user,
    ui,
    order,
    item
  }),
  {},
  composeWithDevTools(applyMiddleware(logger, thunk, promise()))
);