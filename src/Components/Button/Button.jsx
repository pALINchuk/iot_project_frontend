import styles from "../Button/Button.module.css";

const Button = ({children, classes, onClick}) => {
    return (
        <div className={styles.customized_button}>
            <button
                className={classes}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )
}

export default Button