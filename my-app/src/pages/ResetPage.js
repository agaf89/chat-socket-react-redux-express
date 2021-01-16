import { useState } from "react"
import { useSelector } from "react-redux"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const ResetPage = () => {
    const {loading} = useSelector( state => state.login)
    const message = useMessage()
    const {request } = useHttp()
    const [value, setValue] = useState('')
    const resetHandler = async () => {
        try {
            const data = await request('/reset', 'POST', {email: value})
            data && message(data.message)
        } catch (e) {}
    }
    return (
        <div className='bcg-auth'>
            <div className='row'>
                <div className='col s10 offset-s1 l4 offset-l4  m6 offset-m3'>
                    <h3 className='center-align'>Чат <strong>Socket.io</strong></h3>
                    <div className="card pink darken-4 z-depth-4">
                        <div className="card-content">
                            <div style={{marginBottom: '1.5rem'}}>Введите почту</div>
                            <div id='login' className='mt-card'>
                                <div className="input-field">
                                    <input
                                        value={value}
                                        id="email"
                                        type="text"
                                        name='email'
                                        className='green-input'
                                        onChange={(e)=> setValue(e.target.value)}
                                    />
                                    <label htmlFor="email">Email</label>
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