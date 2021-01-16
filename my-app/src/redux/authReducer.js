import { IS_AUTH_FALSE, IS_AUTH_TRUE, TOKEN, USER_ID } from "./types"

const initialState = {
    isAuthenticated: false,
    token: null,
    userId: null,
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_AUTH_TRUE:
            return {
                ...state, isAuthenticated: true
            }
        case IS_AUTH_FALSE:
            return {
                ...state, isAuthenticated: false
            }
        case TOKEN:
            return {
                ...state, token: action.payload
            }
        case USER_ID:
            return {
                ...state, userId: action.payload
            }
        default: return state
    }
    
}