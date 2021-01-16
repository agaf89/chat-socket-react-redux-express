import { useCallback, useEffect, useState } from "react"
import { useHttp } from "../hooks/http.hook"
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { Private } from '../components/Private'
import { PrivateInput } from './../components/PrivateInput';
import { PrivatPosts, setChatID } from "../redux/actions"
import { WriteTextBlock } from "../components/WriteTextBlock"
export const PrivateChat = () => {
    const dispatch = useDispatch()
    const { token } = useSelector( state => state.auth)
    const [ name, setName] = useState('')
    const { request } = useHttp();
    const userID = useParams().id

    const fetched = useCallback( async ()=>{
        console.log(userID)
        const data = await request(`/chat/ID/${userID}`, 'GET', null, {
            authorization: `Bearer ${token}`
        })
        
        dispatch(PrivatPosts(data.private))
        setName(data.data.nameUser)
        
        
    },[userID,request,token,dispatch])

    const chatName = useCallback(()=> {
        dispatch(setChatID(userID))
    },[])

    useEffect(()=>{
        console.log('useEffect privatchat')
        fetched()
        chatName()
        console.log(userID)
    },[userID])
    
    return (
        <div className='container'>
            <div className='privat-header'>Приватный Чат с <strong>{name.toLocaleUpperCase()}</strong></div>
            <Private/>
            <WriteTextBlock/>
            <PrivateInput/>
        </div>
        
    )
}