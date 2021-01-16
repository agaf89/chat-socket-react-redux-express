import { useEffect } from 'react';
import { useAuth } from '../hooks/auth.hook';
import { useHistory } from 'react-router-dom';
import { NAvLink } from './NAvLink';

export const Navbar = () => {
    const history = useHistory()
    const { logout } = useAuth()
    
    useEffect(()=> {
        const active = document.querySelectorAll('#nav-mobile li')
        active.forEach( item => {
            item.addEventListener ('click', e => {
                active.forEach( item => item.classList.remove('active'))
                item.classList.add('active')
            })
        })
        const elems = document.querySelectorAll('.sidenav');
        window.M.Sidenav.init(elems);
    },[])

    const changeLogout = () => {
        const anwser = window.confirm('Вы желаете выйти из чата?')
        anwser && logout();
        history.push('/')
    }

    return (
        <>
            <nav>
                <div className="nav-wrapper  z-depth-2" style={{padding: '0 2rem', backgroundColor: '#29B1B9'}}>
                <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <span className="brand-logo">Чат <strong>Socket.io</strong></span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <NAvLink to={'/system-chat'} text={'Общий чат'}/>
                        <NAvLink to={'/chat'} text={'Сообщения'}/>
                        <li>
                            <a href='/' onClick={changeLogout}><i className="material-icons exit-btn">exit_to_app</i></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <NAvLink to={'/system-chat'} text={'Общий чат'}/>
                <NAvLink to={'/chat'} text={'Сообщения'}/>
                <li>
                    <a href='/' onClick={changeLogout}><i className="material-icons exit-btn">exit_to_app</i></a>
                </li>
            </ul>
        </>
    )
}