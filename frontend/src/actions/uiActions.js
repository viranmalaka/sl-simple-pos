import {UI} from '../constants/actions'

export const toggleSidebar = () => {
    return {
        type: UI.SIDEBAR_TOGGLE
    };
}

export const redirect = (url) => {
    return {
        type: UI.REDIRECT,
        payload: url,
    }
}