export const Input = ({id, type,name, func, clases, text}) => {
    return(
        <div className="input-field">
        <input 
            id={id}
            type={type}
            name={name}
            className={clases}
            onChange={func}
        />
        <label htmlFor={id}>{text}</label>
    </div>
    )
}