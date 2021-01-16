import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WriteTextBlock } from '../components/WriteTextBlock';
import { useHttp } from '../hooks/http.hook';
import { createPost} from '../redux/actions';
import  InputChat  from './../components/InputChat';
import MainChat  from './../components/MainChat';

export const Chat = () => {
  const { request } = useHttp()
  const { token } = useSelector( reducer => reducer.auth)
  const dispatch = useDispatch()
  const messageHandler = async () => {
    const data = await request('/chat/posts', 'GET', null, {
      authorization: `Bearer ${token}`
    })
    !data && console.log(data)
    data && dispatch(createPost(data))
  }
  useEffect(()=>{
    console.log("isAuthenticated")
    messageHandler()
   
  },[])

  return (
      <>
        <div className='container'>
            <MainChat/>
            <WriteTextBlock/>
            <InputChat/>
        </div>
        
      </>
    );
}