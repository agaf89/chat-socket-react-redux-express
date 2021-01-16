import { LIST_USERS, COUNT_USERS } from "./types"


const initialState = {
    count: null,
    listUsers: []
}


export const informReducer = (state = initialState, action) => {
    switch (action.type) {
        case LIST_USERS:
            return {
                ...state, listUsers: [...action.payload]
            }
        case COUNT_USERS:
            return {
                ...state, count: action.payload
            }
        
        default: return state
    }
    
}