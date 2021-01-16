import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../helpers/socket";
import { setCountUsers, setUsers } from "../redux/actions";
import { ListItem } from "./ListItem";

export const InformationTable = () => {
    const dispatch = useDispatch()
    const { count, listUsers } = useSelector( state => state.info)  
    
    const closeCollapse = () => {
        const elems = document.querySelector('.collapsible');
        window.M.Collapsible.init(elems);
        const instance = window.M.Collapsible.getInstance(elems);
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.inform-panel')) {
                instance.close()
            }
        }) 
    }

    useEffect(()=>{
        closeCollapse()
        dispatch(setCountUsers())
        dispatch(setUsers())
        return () => socket.off('usersInfo')
    },[])
    
    return (
        <div className='inform-panel'>
            <ul className="collapsible hoverable">
                <li>
                    <div className="collapsible-header">
                        <i style={{color: '#77C183'}} className="material-icons">brightness_1</i>
                         онлайн
                        
                        <span  className="badge"><strong>{count}</strong></span>
                    </div>
                    <div className="collapsible-body">
                    <ul className="collection with-header">
                        { listUsers.map( user => {
                            return (
                                <ListItem key={user.id} name={user.user} id={user.id} />
                            )
                        }) }
                       
                    </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
} 