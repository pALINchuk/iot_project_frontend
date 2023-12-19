import styles from './Input.module.css'
const Input = ({placeholder, onChange, value, type, ...props}) => {

    return(
        // <div>
            <input className={styles.input}
                   type={type}
                   placeholder={placeholder}
                   onChange={onChange}
                   value={value}
            />
        // </div>
    )
}

export default Input