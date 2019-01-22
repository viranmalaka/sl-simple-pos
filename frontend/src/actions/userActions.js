import { ItemAPI, AuthAPI } from "../http-handler";
import { Auth } from '../constants/actions'

export function setName(name) {
    // return {
    //     type: 'SET_NAME',
    //     payload: 'Malaka',
    // }
    // return dispatch => {
    //     return {
    //         type: 'SET_NAME',
    //         payload: axios.get('/')
    //     }
    // }
    return {
        type: 'SET_NAME', 
        payload: ItemAPI.getAll()
    }
    // return {
    //     type: "SET_NAME",
    //     payload: new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve(name);
    //         }, 2000);
    //     })
    // };
}

export const login = (username, password) => {
    return {
        type: Auth.LOGIN,
        payload: AuthAPI.login(username, password)
    }
}