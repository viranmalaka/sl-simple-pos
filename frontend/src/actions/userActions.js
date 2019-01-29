import { ItemAPI, AuthAPI } from "../http-handler";
import { Auth } from '../constants/actions'

export function setName(name) {
  return {
    type: 'SET_NAME',
    payload: ItemAPI.getAll() // api calls (promise)
  }
}

export const login = (username, password) => {
  return {
    type: Auth.LOGIN,
    payload: AuthAPI.login(username, password) // api calls(promise)
  }
}

export const initAuthRequest = () => {
  return {
    type: Auth.CHECK_AUTH,
    payload: AuthAPI.checkAuth(), // api calls( promise)
  }
}

export const logout = () => {
  window.localStorage.getItem('token');
  return {
    type: Auth.LOGOUT,
    payload: true
  }
}