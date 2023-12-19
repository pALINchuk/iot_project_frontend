import {useEffect, useState} from "react";
import registrationImg from '../../Assets/Registration_1.svg'
import styles from './Registration.module.css'
import Input from "../Input/Input";
import Button from "../Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {RegistrationServiceTeacher} from "../../services/RegistrationServiceTeacher";
import {RegistrationServiceStudent} from "../../services/RegistrationServiceStudent";
import {GetGroupsService} from "../../services/GetGroupsService";

const Registration = () => {
    const [isStudent, setIsStudent] = useState(true)
    const [group, setGroup] = useState('')
    const [surname, setSurname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    // const [response, setResponse] = useState('')

    const [groups, setGroups] = useState([])

    const navigate = useNavigate()

    const studentTeacherButtonOnclick = (isStudent) => {
        setIsStudent(isStudent)
    }

    const registrationButtonOnclick = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

            try{
                const result = isStudent ? await RegistrationServiceStudent(name, surname, email, password, group) : await RegistrationServiceTeacher(name, surname, email, password)
                // setResponse(result.data)
                // console.log(result.data); // Handle the response from the server
                setGroup('')
                setSurname('')
                setName('')
                setEmail('')
                setPassword('')
                setError(false)
                navigate('/login')
            }
            catch(error){
                console.error(error)
                setError(true)
            }
    }

    const inputChangeHandler = (e, field) => {
        if(field === 'group'){
            setGroup(e.target.value)
        } else if(field === 'surname'){
            setSurname(e.target.value)
        } else if(field === 'name'){
            setName(e.target.value)
        } else if(field === 'email'){
            setEmail(e.target.value)
        } else if(field === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSelectChange = (e) => {
        setGroup(e.target.value)
    }

    useEffect(() => {
        const fetchGroups = async() => {
            try{
                const groupsResponse = await GetGroupsService()
                console.log(groupsResponse.data)
                setGroups(groupsResponse.data)
            } catch(error){
                console.error(error)
            }
        }

        fetchGroups()
    }, [])

    return (
        <div className={styles.registration_wrapper}>
            <div className={styles.registration_infoBlock}>
                <h1>Реєстрація</h1>
                <img src={registrationImg} alt='registration_image'/>
            </div>
            <div className={styles.registration_signupBlock}>
                <div>
                    <h3>Заповнення даних</h3>
                    <p className={styles.registration_signupBlock_paragraph}>процес займає зазвичай не більше двох хвилин</p>
                </div>
                {/*<div>*/}
                    <div className={styles.registration_buttons}>
                        <button
                            className={`${styles.registration_studentButton} ${isStudent ? styles.active : ''}`}
                            onClick={() => studentTeacherButtonOnclick(true)}
                        >
                            Я студент/-ка
                        </button>
                        <button
                            className={`${styles.registration_teacherButton} ${isStudent ? '' : styles.active}`}
                            onClick={() => studentTeacherButtonOnclick(false)}
                        >
                            Я викладач/-ка
                        </button>
                    </div>
                    {
                        isStudent ?
                            // <Input
                            //     placeholder='Група'
                            //     onChange={(e) => inputChangeHandler(e, 'group')}
                            //     value={group}
                            // />
                            <div className={styles.registration_signupBlock_groups}>
                                <label>Група</label>
                                <select value={group} onChange={handleSelectChange}>
                                    <option value="">Обрати</option>
                                    {
                                        Object.keys(groups).map((option, index) => (
                                            <option key={index} value={groups[option].groupCode}>
                                                {groups[option].groupCode}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            : ''
                    }
                    <Input
                        placeholder='Прізвище'
                        onChange={(e) => inputChangeHandler(e, 'surname')}
                        value={surname}
                        type={'text'}
                    />
                    <Input
                        placeholder='Ім’я'
                        onChange={(e) => inputChangeHandler(e, 'name')}
                        value={name}
                        type={'text'}
                    />
                    <Input
                        placeholder='E-mail'
                        onChange={(e) => inputChangeHandler(e, 'email')}
                        value={email}
                        type={'text'}
                    />
                    <Input
                        placeholder='Пароль'
                        onChange={(e) => inputChangeHandler(e, 'password')}
                        value={password}
                        type={'password'}
                    />
                    <Button
                        classes={styles.registration_signupBlockButton}
                        onClick={registrationButtonOnclick}
                    >
                        Зареєструватися
                    </Button>
                    {error && <p className={styles.registration_signupBlockError}>Wrong input</p>}
                    <p className={styles.registration_signupBlockToLogin}>Вже маєте існуючий акаунт? <NavLink to='/login'>Увійдіть.</NavLink></p>
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Registration