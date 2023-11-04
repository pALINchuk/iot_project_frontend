import {useState} from "react";
import styles from './Auth.module.css'
import firstImg from '../../Assets/Auth_1.svg'
import item1 from '../../Assets/Auth_item1.svg'
import item2 from '../../Assets/Auth_item2.svg'
import item3 from '../../Assets/Auth_item3.svg'
import thirdImg from '../../Assets/Auth_3.svg'
import Input from "../Input/Input";
import {useNavigate, NavLink} from "react-router-dom";
import Button from "../Button/Button";
import {AuthServiceStudent} from "../../services/AuthServiceStudent";
import {AuthServiceTeacher} from "../../services/AuthServiceTeacher";

const Auth = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const [isStudent, setIsStudent] = useState(true)

    // const [response, setResponse] = useState('')

    const navigate = useNavigate()

    const inputChangeHandler = (e, field) => {
        if(field === 'login'){
            setLogin(e.target.value)
        }
        else{
            setPassword(e.target.value)
        }
    }

    const authHandler = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try{
            const result = isStudent ? await AuthServiceStudent(login, password)
                                        : await AuthServiceTeacher(login, password)
            // setResponse(result.data)
            // console.log(result.data)

            localStorage.setItem('token', result.data.token)

            setLogin('')
            setPassword('')
            navigate('/')
        }
        catch(error){
            console.error(error)
        }
    }

    const studentTeacherButtonOnclick = (isStudent) => {
        setIsStudent(isStudent)
    }

    return (
        <div className={styles.auth_wrapper}>
            <div className={styles.auth_infoBlock}>
                <div className={styles.auth_infoBlock_title}>
                    <img src={firstImg} alt='main_image'/>
                    <div>
                        <h1>Підготуйся до пари</h1>
                        <p>Забронюй необхідне обладнання для наступної лабораторної</p>
                    </div>
                </div>
                <div className={styles.auth_infoBlock_list}>
                    <div className={styles.auth_infoBlock_list_item}>
                        <div>
                            <img src={item1} alt='point1'/>
                            <h1>Перевір наявність</h1>
                        </div>
                        <p>Перевірте наявність необхідного обладнання в режимі онлайн,
                            без важких дзвінків і зайвого часу в черзі</p>
                    </div>
                    <div className={styles.auth_infoBlock_list_item}>
                        <div>
                            <img src={item2} alt='point2'/>
                            <h1>Бронюй онлайн</h1>
                        </div>
                        <p>Бронюйте обладнання в будь-який зручний момент, з будь-якої точки</p>
                    </div>
                    <div className={styles.auth_infoBlock_list_item}>
                        <div>
                            <img src={item3} alt='point3'/>
                            <h1>Забери перед парою</h1>
                        </div>
                        <p>Не забудьте зайти забрати все необхідне для того, щоб бути підготовленим до заняття</p>
                    </div>
                </div>
            </div>
            <div className={styles.auth_loginBlock}>
                <img src={thirdImg} alt='login_image'/>
                <h2>Вхід в систему</h2>
                <div className={styles.auth_loginBlock_form}>
                    <div className={styles.auth_buttons}>
                        <button
                            className={`${styles.auth_studentButton} ${isStudent ? styles.active : ''}`}
                            onClick={() => studentTeacherButtonOnclick(true)}
                        >
                            Я студент/-ка
                        </button>
                        <button
                            className={`${styles.auth_teacherButton} ${isStudent ? '' : styles.active}`}
                            onClick={() => studentTeacherButtonOnclick(false)}
                        >
                            Я викладач/-ка
                        </button>
                    </div>
                    <Input
                        placeholder={'Логін'}
                        onChange={(e) => inputChangeHandler(e, 'login')}
                        value={login}
                    />
                    <Input
                        placeholder={'Пароль'}
                        onChange={(e) => inputChangeHandler(e, 'password')}
                        value={password}
                    />

                    <Button
                        classes={styles.auth_loginButton}
                        onClick={authHandler}
                    >
                        Увійти
                    </Button>

                </div>
                <p className={styles.auth_loginBlock_registration}>
                    Немає акаунту?
                    <NavLink to='/registration'>
                        Зареєструйтеся.
                    </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Auth