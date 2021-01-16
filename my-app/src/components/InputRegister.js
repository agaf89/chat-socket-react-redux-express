import { useState } from "react"
import { useMessage } from "../hooks/message.hook"
import { Input } from "./Input"

export const InputRegister = ({formHandler, registerHandler, loading, value}) => {
    const message = useMessage()
    const [correct, setCorrect] = useState(true)
    
    const checkPassowrd = ( e) => {
        const target = e.target.value
        if (target.length === value.length && target !== value){
            message('Пароль не совпадает', true)
            setCorrect(true)
        } 
        if (target.length === value.length && target === value ){
            message('Пароль совпал')
            setCorrect(false)
        }
        if( !correct && target.length !== value.length){
            message('Пароль не совпадает', true)
            setCorrect(true)
        }
    }
    return (
        <>
             <div className="card-content">
                <form id='reg' className='mt-card register'>
                    <Input id={"name"} type ={"text"} name={'nameUser'} func={formHandler} clases={'yellow-input'} text={'Никнейм'}/>
                    <Input id={"email"} type ={"text"} name={'email'} func={formHandler} clases={'yellow-input'} text={'Email'}/>
                    <Input id={"password"} type ={"password"} name={'password'} func={formHandler} clases={'yellow-input'} text={'Пароль'}/>
                    <Input id={"password"} type ={"password"} name={'password'} func={checkPassowrd} clases={'yellow-input'} text={'Повторите пароль'}/>
                </form>
            </div>
            <div style={{paddingBottom: '20px'}} className="card-action center-align">
                <button disabled={correct} onClick={ async ()=> {
                    setCorrect(true)
                    await registerHandler()
                    setCorrect(false)}} 
                    className='btn waves-effect yellow black-text z-depth-2'
                    >Регистрация
                </button>
            </div>
        </>
    )
}