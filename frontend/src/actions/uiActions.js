
// actions for ui store

import { UI } from '../constants/actions'

export const toggleSidebar = () => {
  return {
    type: UI.SIDEBAR_TOGGLE // toggle 
  };
}

export const redirect = (url) => {
  return {
    type: UI.REDIRECT,
    payload: url, 
  }
}

export const changePath = (url) => {
  return {
    type: UI.CHANGE_PATH,
    payload: url
  }
}

export const showAllOrders = (bool) => {
  return {
    type: UI.ALL_ORDERS,
    payload: bool
  }
}
