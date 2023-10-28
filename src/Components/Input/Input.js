import styles from './Input.module.css'
const Input = ({placeholder, onChange, value, ...props}) => {

    return(
        // <div>
            <input className={styles.input}
                   type="text"
                   placeholder={placeholder}
                   onChange={onChange}
                   value={value}
            />
        // </div>
    )
}

export default Input