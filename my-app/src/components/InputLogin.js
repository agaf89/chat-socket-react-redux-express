import { Link } from "react-router-dom"
import { Input } from "./Input"

export const InputLogin = ({formHandler, registerHandler, loading}) => {
    return (
        <>
             <div className="card-content">
                <div id='login' className='mt-card'>
                    <Input id={"email"} type ={"text"} name={'email'} func={formHandler} clases={'green-input'} text={'Email'}/>
                    <Input id={"password"} type ={"password"} name={'password'} func={formHandler} clases={'green-input'} text={'Пароль'}/>
                </div>
            </div>
            <div className="card-action center-align">
                <button disabled={loading} onClick={registerHandler} className='btn green accent-3 black-text z-depth-2 waves-effect'>Войти</button>         
            </div>
            <div className= 'forgot-block'>
                <Link to={'/reset'} className='forgot' >Забыли пароль?</Link>
            </div>
        </>
    )
}