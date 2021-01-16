import { socket } from "../helpers/socket";
import { COUNT_USERS, CREATE_POST, HIDE_ERROR, HIDE_LOADER, IS_AUTH_FALSE, IS_AUTH_TRUE, LIST_USERS, PRIVATE_CHAT_ID, PRIVATE_POST, PRIVATE_POST_FETCHED, SHOW_ERROR, SHOW_LOADER, TOKEN, USER_ID } from "./types";

export function createPost (post) {
    return {
        type: CREATE_POST,
        payload: post
    }
}
export function showLoading () {
    return {
        type: SHOW_LOADER
    }
}
export function hideLoading () {
    return {
        type: HIDE_LOADER
    }
}
export function showError (errorMessage) {
    return {
        type: SHOW_ERROR,
        payload: errorMessage
    }
}
export function hideError () {
    return {
        type: HIDE_ERROR
    }
}
export function isAuthTrue () {
    return {
        type: IS_AUTH_TRUE
    }
}
export function isAuthFalse () {
    return {
        type: IS_AUTH_FALSE
    }
}
export function setToken (token) {
    return {
        type: TOKEN,
        payload: token
    }
}
export function setUserID (id) {
    return {
        type: USER_ID,
        payload: id
    }
}
export function setCountUsers () {
    return async dispatch => {
        await socket.on('usersInfo', data => {
            dispatch({type: COUNT_USERS, payload: data.count})
        })
    } 
}
export function setUsers () {
    return async dispatch => {
        await socket.on('usersInfo', data => {
            dispatch({type: LIST_USERS, payload: data.Users})
        })
    } 
}
export function PrivatePost () {
    return async dispatch => {
        await socket.on('privateMessage', data => {
            dispatch({type: PRIVATE_POST, payload:data})
        })
    }
}
export function setChatID ( id ) {
    return {
        type: PRIVATE_CHAT_ID,
        payload: id
    }
}
export function PrivatPosts ( posts ) {
    return {
        type: PRIVATE_POST_FETCHED,
        payload: posts
    }
}