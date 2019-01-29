import axios from "axios";

const API_ROOT = 'http://localhost:4000/' // root of the api url

const responseBody = res => res.data; // an arrow function to takes only the data value from the response object
const errBody = res => {              // an arrow function to takes only the response body from error response.
  throw res.response.data;
}

// axios configuration object. this has header values with token. 
const axiosConfig = {
  headers: {
    token: ''
  }
}

// general 4 types of requests
const request = {
  get: url => axios.get(`${API_ROOT}${url}`, axiosConfig).then(responseBody).catch(errBody),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body, axiosConfig).then(responseBody).catch(errBody),
  put: (url, body) => axios.put(`${API_ROOT}${url}`, body, axiosConfig).then(responseBody),
  del: url => axios.delete(`${API_ROOT}${url}`, axiosConfig).then(responseBody),
}

// request belongs to item api
const Items = {
  getAll: () => request.get('items'),
  createItem: (data) => request.post('items', data),
}

// request belongs to orders api
const Orders = {
  getAll: () => request.get('orders'),
  createOrder: (body) => request.post('orders', body),
  addItemToOrder: (orderId, itemId, quantity) => request.put('orders/add-item/' + orderId, {itemId, quantity}),
  deleteItemFromOrder: (orderId, itemId) => request.del('orders/' + orderId + "/delete-item/" + itemId),
  setOrderStatus: (orderId, status) => request.put('orders/change-status/' + orderId, {status}),
}

// request belongs to user api
const Auth = {
  login: (username, password) => request.post('users/login', { username, password }),
  checkAuth: () => {
    AuthInit();
    return request.get('users/check-token/', axiosConfig)
  },
}

// this function uses to read the local storage for and token and bind it with axios configuration object.
const AuthInit = () => {
  const token = window.localStorage.getItem('token');
  axiosConfig.headers.token = token;
}

export {
  Items as ItemAPI,
  Auth as AuthAPI,
  Orders as OrderAPI,
  axiosConfig,
  AuthInit
}