import { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useHttp } from "../hooks/http.hook"
import { Link } from 'react-router-dom';
import { useMessage } from "../hooks/message.hook";


export const PrivateMessages = () => {
    const message = useMessage()
    const { token, userId } = useSelector( state => state.auth )
    const { listUsers } = useSelector( state => state.info )
    const { request } = useHttp()
    const [posts, setPosts] = useState('')

    const fetchedAndUnique = /* useCallback( */ async ()=> {
        const data = await request('/chat/chat', 'GET', null, {
            authorization: `Bearer ${token}`
        })
        console.log('error', data)
        const newArr = data.filter ( (item,i) => {
            return data.findIndex( ite => ite.owner === item.owner) === i
        }).filter( item => item.owner !== userId)
        setPosts(newArr)

    }

    useEffect(()=> {
        fetchedAndUnique()
        console.log('PrivateMessages')
        
    },[])

    const fetchedd = useCallback( async(data)=>{
        const response = await request('/chat/remove', 'POST', {to:data, from:userId})
        message(response.message)
    },[request,userId,message])

    const deleteItem = (data ,e) => {
        e.preventDefault()
        const anwser = window.confirm(`Удалить переписку с ${data.nameUser}`)
        if (anwser){
            fetchedd(data.owner)
            fetchedAndUnique()
        }
    }
    
    return (
        <div className='container'>
            <ul style={{marginTop: '50px'}} className="collection with-header">
                <li className="collection-header"><h4 className='center-align'>Личные сообщения</h4></li>
                { posts.length === 0 ? <h6 className='center-align'>Вам никто не написал 😒</h6> : posts.map( (item,i) => {
                    const status = listUsers.find( ite => ite.id === item.owner )
                    return (
                        <Link to={ item.owner === userId ? '/' : `/chat/${item.owner}`} key={item.idForReact} style={{cursor: 'pointer'}} className="collection-item hoverable">
                            <div>{item.nameUser.toLocaleUpperCase()}</div>
                            <div  style={{fontStyle: 'initial'}}>{ status ? 'В сети' : 'Нет в сети'}</div>
                            <div className='icons-block'>
                                <i style={{color: '#87BD5A'}} className="material-icons exit-btn helper">send</i>
                                <i onClick={(e) => deleteItem(item,e)} style={{color: 'indianred', marginLeft: '10px'}} className="material-icons exit-btn helper">delete_forever</i>
                            </div>
                        </Link>
                    )
                })}
            </ul>
        </div>
    )
}