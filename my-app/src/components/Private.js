import { useEffect, useRef } from 'react'
import { useSelector} from 'react-redux'
import { Scrollbar } from 'react-scrollbars-custom';
const style = {
    li: {
        fontSize: '20px',
        marginLeft: '10px',
        color: '#FEFCEF'
    },
    ul: {
        padding: '15px'
        
    },
    div: {
        display: 'flex'
    }
}
export const Private = () => {
    const messageEnd = useRef(null)
    const { posts } = useSelector( state => state.private)
    const { userId } = useSelector( state => state.auth)
    const messageFromClass = 'messageFrom';
    const nameSelf ='nameUser nameUser-self'
    const scrollToLastMessage = () => {
        if (!messageEnd){
            return
        }
        messageEnd.current.scrollIntoView({ block: "center", behavior: "smooth" })
    }
    
    useEffect(()=>{
        console.log('Private')
        scrollToLastMessage()
    })
    
    return (
        
            <div className='chat-wrapper z-depth-4'>
                <Scrollbar>
                <ul style={style.ul}>
                    {posts.map( (item,i) => {
                        console.log(item)
                        const idForSelf = userId.toString() === item.owner;
                        return (
                            <div className={ idForSelf ? 'chat-item' : messageFromClass } key={i}>
                                <div className='chat-wrapper__item'>
                                    <li className={ idForSelf ? nameSelf : 'nameUser'}>{ userId === item.owner ? `Вы (${item.nameUser})` : item.nameUser}</li>
                                    <li style={style.li}>
                                        { item.message }
                                    </li>
                                    <div>
                                        <span>
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <div ref={messageEnd}></div>
                </ul>
                </Scrollbar>
            </div>
    )
}
