import { useEffect, useState } from "react"
import { socket } from "../helpers/socket"

export const WriteTextBlock = () => {
    const [write, setWrite] = useState(false)
    const [name, setName] = useState('')
    
    useEffect(()=>{
        const time = setInterval(()=> setWrite(false), 5000)
        socket.on('writeText', data => {
            setName(data.nameUser)
            setWrite(true)
        })
        return () => {
            clearInterval(time)
            socket.off('writeText')
        }
    },[])
    return (
        <div style={{margin: '0 auto', maxWidth: '900px'}}>
            <div className={ write ? 'loading' : 'd-none'}>Печатает {name}</div>
        </div>
    )
}