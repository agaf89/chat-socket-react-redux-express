import { useEffect, useState, Suspense, lazy } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { createPost } from './../redux/actions';
import { Spinner } from './Spinner';
import { useMessage } from '../hooks/message.hook';
import { socket } from '../helpers/socket';

const ProfilePage = lazy(() => {
    const Picker = import('emoji-picker-react')
    return Picker
});

const InputChat = () => {
    const {token} = useSelector(state => state.auth)
    const message = useMessage()
    const [value, setValue] = useState('');
    const [showEmoji, setStatusEmoji] = useState(false)
    const styleTextarea = {};
    if (!value.message){
        styleTextarea.height = '45px'
    }
    let dispatch = useDispatch();

    useEffect(() => {
        
        const elems = document.querySelectorAll('.autocomplete');
        window.M.Autocomplete.init(elems);
        window.M.updateTextFields()
        const sendMessage = (data) => {
            console.log(data)
            dispatch(createPost([data]))
        }
        socket.on('postMessage', sendMessage )
    },[])

    const formHandler = (e) => {
        e.preventDefault()
        console.log( value)
        if (!value.trim()) {
            message('Напишите сообщение')
            return
        }
        setValue('');
        socket.emit('postMessage', {value, token})
    }
   
    const inputHandler = (e) => {
        socket.emit('writeText', token)
        setValue( e.target.value )
    }

    const onEmojiClick = (_, emojiObject) => {
        setValue( value + emojiObject.emoji)
        if (emojiObject.emoji) {
            document.querySelector('.input-field label').classList.add('active')
        }
    };

    const toggleEmoji = () => {
        setStatusEmoji(true)
        const emoji = document.querySelector('.emoji-block')
        emoji.classList.toggle('active-emoji')
        
        document.addEventListener('click', (e) => {
            const target = e.target
            if (!target.closest('.emoji-block') && target.tagName !== 'I') {
                emoji.classList.remove('active-emoji');
            }
        })
    }

    return (
        <form onSubmit={formHandler} className="row d-flex">
            <div className="col s12">
                <div className="row">
                    <div className="input-field col s12" style={{ right: '13px', width: '94%' }}>
                        <i className="material-icons prefix" style={{ fontSize: '21px', top: '15px' }}>textsms</i>
                        <textarea 
                            autoComplete="off" 
                            onChange={inputHandler} 
                            value={value} 
                            type="text" 
                            id="textarea1" 
                            className="materialize-textarea"
                            style={styleTextarea}>
                        </textarea>
                        <label htmlFor="textarea1"> Сообщение </label>
                        <i onClick={toggleEmoji} className="material-icons prefix i-emoji pulse">insert_emoticon</i>
                    </div>
                </div>
            </div>
            <button className="btn waves-effect pink mt-btn" type="submit" name="action">Send
                <i className="material-icons center">email</i>
            </button>
            <div className='emoji-block'> 
                {showEmoji && <Suspense fallback={ <Spinner />}><ProfilePage onEmojiClick={onEmojiClick} /></Suspense>}
            </div>
        </form>
    )
}
const mapDispatchToProps = {
    createPost: createPost
}


export default connect(null, mapDispatchToProps)(InputChat);