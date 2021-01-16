import { PRIVATE_CHAT_ID, PRIVATE_POST, PRIVATE_POST_FETCHED } from "./types";

const initialState = {
    posts: [],
    id: ''
}


export const privateReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRIVATE_POST:
            return {
                ...state, posts: [...state.posts, action.payload]
            }
        case PRIVATE_CHAT_ID:
            return {
                ...state, id: action.payload
            }
        case PRIVATE_POST_FETCHED:
            return {
                ...state, posts: [...state.posts, ...action.payload]
            }
            
    
        default:
            return state
    }
    
}