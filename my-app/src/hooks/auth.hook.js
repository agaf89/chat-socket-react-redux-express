import {useCallback, useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { socket } from '../helpers/socket';
import { isAuthFalse, isAuthTrue, setToken, setUserID } from '../redux/actions';
import { useMessage } from './message.hook';

const storageName = 'userData'

export const useAuth = () => {
    const [ready, setReady] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    const login = useCallback( (jwtToken, id) => {
        dispatch(setToken(jwtToken))
        dispatch(setUserID(id))
        dispatch(isAuthTrue())
        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken
        }))
    }, [dispatch])


    const logout = useCallback(()=> {
        dispatch(setToken(null))
        dispatch(setUserID(null))
        dispatch(isAuthFalse())
        localStorage.removeItem(storageName)
        socket.emit('logout', socket.id)
    }, [dispatch])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        
        if (data && data.token ){
            login(data.token, data.userId)
        }
        setReady(true)
    },[login])

    return { login, logout, ready }
}