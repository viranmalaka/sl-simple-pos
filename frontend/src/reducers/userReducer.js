import { Auth } from '../constants/actions'
import {axiosConfig} from '../http-handler';

const init = {
	login: false,
	loginError: null,
	loginSuccess: {},
};

const userReducer = (state = init, action) => {
	switch (action.type) {
		case Auth.LOGIN_REJECT:
			state = {
				...state,
				login: false,
				loginError: action.payload,
			}
			break;

		case Auth.LOGIN_FULFILLED:
			state = {
				...state,
				login: true,
				loginSuccess: action.payload,
      }
      // FIXME: is this OK?
			window.localStorage.setItem('token', action.payload.token);
			axiosConfig.headers.token = action.payload.token;
			break;
		default:
	}
	return state;
};

export default userReducer;