import { useCallback} from 'react'
import { useDispatch } from 'react-redux'
import { hideError, hideLoading, showError, showLoading } from '../redux/actions'
import { useAuth } from './auth.hook'
import { useMessage } from './message.hook'

export const useHttp = () => {
    const dispatch = useDispatch()
    const {logout} = useAuth()
    const message = useMessage()
    const request = useCallback(async (url, method = "GET", body = null, headers={}) => {
        dispatch(showLoading())
        try {
            if (body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, {
                method,
                body, 
                headers
            })
            const data = await response.json()
            if ( !response.ok ){
                logout()
                dispatch(showError(data.message))
                message(data.message, true)
                dispatch(hideError())
                return []
            }
            dispatch(hideLoading())
            console.log(data)
            return data
        } catch (e) {
            
            dispatch(hideLoading())
            dispatch(showError(e.message))
            dispatch(hideError())
            throw e
        }
    },[logout,dispatch])
    return {
         request
    }
}