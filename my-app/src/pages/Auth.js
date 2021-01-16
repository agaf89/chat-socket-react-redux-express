import { useEffect, useState } from 'react';
import { useHttp } from './../hooks/http.hook';
import { InputLogin } from '../components/InputLogin';
import { InputRegister } from '../components/InputRegister';
import { useSelector } from 'react-redux';
import { useMessage } from '../hooks/message.hook';
import { useAuth } from '../hooks/auth.hook';
import { socket } from '../helpers/socket';

export const Auth = () => {
    const {request} = useHttp()
    const messages = useMessage();
    const { login } = useAuth()
    const { token } = useSelector(state => state.auth)
    /* socket.emit('disconected', token ) */
    const [form, setForm] = useState({email: '', password: '', nameUser: ''})
    const [loginActive, setLogin ] = useState(true)
    const {loading} = useSelector(state => state.login)


    const classActive = "tab col s6 active-tab"
    const classActiveLink = 'active-a'

    const formHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const registerHandler = async () => {
        try{
            const {message} = await request('/api/auth/register', 'POST', {...form})
            messages(`${message} Авторизуйтесь`)
        } catch (e){}
    }
    const loginHandler = async () => {
        try {
            const {token, userId, message} = await request('/api/auth/login', 'POST', {...form})
            token && login(token, userId)
            token && messages(message)
        } catch (e) {}
    }
    
    return (
        <div className='bcg-auth'>
            <div className='row'>
                <div className='col s10 offset-s1 l4 offset-l4  m6 offset-m3'>
                    <h3 className='center-align'>Чат <strong>Socket.io</strong></h3>
                    <div className="card pink darken-4 z-depth-4">
                        <ul className="tabs">
                            <li onClick={()=>setLogin(true)} className={loginActive ? classActive : 'tab col s6 z-depth-1'}>
                                <a className={loginActive ? classActiveLink : ''} href="#login">Авторизация</a>
                            </li>
                            <li onClick={()=>setLogin(false)} className={!loginActive ? classActive : 'tab col s6 z-depth-1'}>
                                <a className={!loginActive ? classActiveLink : ''} href="#reg">Регистрация</a>
                            </li>
                        </ul>
                            {loginActive ? <InputLogin loading={loading} registerHandler={loginHandler} formHandler={formHandler}/> :
                            <InputRegister value={form.password} loading={loading} registerHandler={registerHandler} formHandler={formHandler}/>}
                    </div>
                </div>
            </div>
        </div>
        
    )
}