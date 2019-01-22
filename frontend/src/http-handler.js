import axios from "axios";

const API_ROOT = 'http://localhost:4000/'

const responseBody = res => res.data;
const errBody = res => {
  throw res.response.data;
}

const axiosConfig = {
  headers: {
    token: ''
  }
}

const request = {
  get: url => axios.get(`${API_ROOT}${url}`, axiosConfig).then(responseBody).catch(errBody),
  post: (url, body) => axios.post(`${API_ROOT}${url}`, body, axiosConfig).then(responseBody).catch(errBody),
  put: (url, body) => axios.put(`${API_ROOT}${url}`, body, axiosConfig).then(responseBody),
  del: url => axios.delete(`${API_ROOT}${url}`, axiosConfig).then(responseBody),
}

const Items = {
  getAll: () => request.get('items'),
  createItem: (data) => request.post('items', data),
}

const Orders = {
  getAll: () => request.get('orders')
}

const Auth = {
  login: (username, password) => request.post('users/login', { username, password }),
}

const init = () => {
  const token = window.localStorage.getItem('token');
  axiosConfig.headers.token = token;
};
init();

export {
  Items as ItemAPI,
  Auth as AuthAPI,
  Orders as OrderAPI,
  axiosConfig
}