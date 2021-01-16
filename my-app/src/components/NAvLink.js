import { NavLink } from "react-router-dom"

export const NAvLink = ({to, text}) => {
    return (
        <li>
            <NavLink to={to}>{text}</NavLink>
        </li>
    )
}