import { SHOW_ERROR, HIDE_ERROR, HIDE_LOADER, SHOW_LOADER } from "./types"


const initialState = {
    loading: false,
    error: false,
    errorMessage: ''
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                ...state, loading: true
            }
        case HIDE_LOADER:
            return {
                ...state, loading: false
            }
        case SHOW_ERROR:
            return {
                ...state, loading: false, error: true, errorMessage: action.payload
            }
        case HIDE_ERROR:
            return {
                ...state, loading: false, error: false, errorMessage: ''
            }
        default: return state
    }
    
}