import { useEffect, useRef } from 'react'
import {connect, useSelector} from 'react-redux'
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
const MainChat = ({postsChat}) => {
    const messageEnd = useRef(null)
    
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
        scrollToLastMessage()
    })
    return (
            <div className='chat-wrapper z-depth-4'>
                <Scrollbar>
                <ul style={style.ul}>
                    {postsChat.map( (item,i) => {
                        const idForSelf = userId.toString() === item.owner._id;
                        return (
                            <div className={ idForSelf ? 'chat-item' : messageFromClass } key={i}>
                                <div className='chat-wrapper__item'>
                                    <li className={ idForSelf ? nameSelf : 'nameUser'}>{ item.owner._id === userId ? `Вы (${item.owner.nameUser})` : item.owner.nameUser}</li>
                                    <li style={style.li}>
                                        {item.message}
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
const mapStateToProps = state => {
    return {
        postsChat: state.posts.posts
    }
}

export default connect(mapStateToProps, null)(MainChat);