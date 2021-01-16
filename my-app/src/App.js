import 'materialize-css'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'

import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';
import { useEffect } from 'react';
import { socket } from './helpers/socket';
import { useMessage } from './hooks/message.hook';
import { useAuth } from './hooks/auth.hook';
import { Spinner } from './components/Spinner';
import {PrivatePost} from './redux/actions'
import { InformationTable } from './components/InformationTable';


function App() {
  const {logout , ready} = useAuth()
  const message = useMessage()
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector( state => state.auth )
  const { loading } = useSelector( state => state.login )
  const routes = useRoutes( token )
  console.log(socket.disconnected)
  if (socket.disconnected){
    socket.emit('disconected', token )
  }
  useEffect(()=>{
    if (token){
      socket.emit('usersInfo', token)
      console.log('AppRender')
      socket.on('broadcast', (e) => {
        console.log('broadcast',e)
        message(`${e.newUser} зашел в чат 👋`)
      })
      dispatch(PrivatePost())
      socket.on('error', (error) => {
        console.log('ОШибка пришла от сюда 1')
        logout()
      })
    }
    
    },[token])
  if (!ready){
    return <Spinner/>
  }
  return (
    <Router>
      { loading && <Spinner/>}
      { token && <Navbar/>}
      {routes}
      { token && <InformationTable/>}
    </Router>
  );
}

export default App;
