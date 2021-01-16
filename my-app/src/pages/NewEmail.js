import { useState } from "react"
import { useSelector } from "react-redux"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"
import { useParams } from 'react-router-dom'
import { useAuth } from "../hooks/auth.hook"

export const NewEmail = () => {
    const {loading} = useSelector( state => state.login)
    const userToken = useParams().token
    const messages = useMessage()
    const { login } = useAuth()
    const {request } = useHttp()
    const [form, setForm] = useState({email: '', password: ''})
    const resetHandler = async () => {
        try {
            const {token, userId, message}  = await request(`/reset/${userToken}`, 'POST', {...form})
            token && login(token, userId)
            token && messages(message)
            !token && message && messages(message, true)
        } catch (e) {}
    }
    const formHandler = (e) => {
        console.log(userToken)
        setForm({...form, [e.target.name]: e.target.value})
    }
    return (
        <div className='bcg-auth'>
            <div className='row'>
                <div className='col s10 offset-s1 l4 offset-l4  m6 offset-m3'>
                    <h3 className='center-align'>Чат <strong>Socket.io</strong></h3>
                    <div className="card pink darken-4 z-depth-4">
                        <div className="card-content">
                            <div style={{marginBottom: '1.5rem'}}>Введите данные</div>
                            <div id='login' className='mt-card'>
                                <div className="input-field">
                                    <input
                                        value={form.email}
                                        id="email"
                                        type="text"
                                        name='email'
                                        className='green-input'
                                        onChange={formHandler}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                                <div className="input-field">
                                    <input
                                        value={form.password}
                                        id="password"
                                        type="password"
                                        name='password'
                                        className='green-input'
                                        onChange={formHandler}
                                    />
                                    <label htmlFor="email">Пароль</label>
                                </div>
                            </div>
                        </div>
                        <div style={{paddingBottom: '20px'}} className="card-action center-align">
                            <button disabled={loading} onClick={resetHandler}  className='btn green accent-3 black-text z-depth-2 waves-effect'>Восстановить</button>         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}