import { combineReducers } from "redux"
import { authReducer } from "./authReducer"
import { chatReducer } from "./chatReducer"
import { loginReducer } from "./loginReducer"
import { informReducer } from "./informReducer"
import { privateReducer } from './privateReducer';



export const rootReducer = combineReducers({
    posts: chatReducer,
    login: loginReducer,
    auth: authReducer,
    info: informReducer,
    private: privateReducer
})