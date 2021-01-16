import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export const ListItem = ({name, id}) => {
    const { userId } = useSelector( state => state.auth)
    
    return (
        <Link to={ id === userId ? '/' : `/chat/${id}`}>
            <li style={{cursor: 'pointer'}} className="collection-item link-to-user">
                <div>
                    {id === userId ? `Вы (${name})` : name}
                </div>
                <i style={{color: 'rgb(41, 177, 185)', verticalAlign: 'middle' }} className="material-icons">send</i>
            </li>
        </Link>
    )
}