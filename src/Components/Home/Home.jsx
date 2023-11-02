import React from "react";
import styles from './Home.module.css'
import Button from "../Button/Button";
import {UserInformationService} from "../../services/UserInformationService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ScheduleService} from "../../services/ScheduleService";
import Lesson from "../Lesson/Lesson";
import {useDispatch, useSelector} from "react-redux";
import {setUser, setCurrentWeek, setWholeSchedule} from "../../Redux/actions";

const Home = () => {
    const navigate = useNavigate()
    // const [user, setUserState] = useState({})
    // const [schedule, setScheduleState] = useState({})
    // const [currentWeek, setCurrentWeekState] = useState({})

    const dispatch = useDispatch()
    const userRedux = useSelector(state => state.user)
    const wholeScheduleRedux = useSelector(state => state.wholeSchedule)
    const currentWeekRedux = useSelector(state => state.currentWeek)

    const exitHandler = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try{
            console.log('exited')
            localStorage.removeItem('token');
            navigate('/login')
        }
        catch(error){
            console.error(error)
        }
    }

    const getNewArray = (arrayOfObjects) => {
        return Array.from({length: 5}, (_, index) => {
            const object = arrayOfObjects.find(item => item.period.subjectNumber === index + 1)
            return object ? {...object} : null
        })
    }

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await UserInformationService(token)
            // setUserState(result.data)
            dispatch(setUser(result.data))

            const schedule = await ScheduleService(token)
            // console.log(schedule.data) //schedule.data.schedule[schedule.data.currentWeek]

            // useState
            // setScheduleState(schedule.data)
            // setCurrentWeekState(schedule.data.schedule[schedule.data.currentWeek])

            // redux
            dispatch(setWholeSchedule(schedule.data))
            dispatch(setCurrentWeek(schedule.data.schedule[schedule.data.currentWeek]))
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                console.log('Unauthorized access. Redirecting to login page...');
                localStorage.removeItem('token');
                navigate('/login')
                // Redirect to the login page or perform other actions for unauthorized access
            } else {
                // Handle other types of errors (network error, server error, etc.)
                console.error('Error occurred:', error);
            }
        }
    }

    useEffect(() => {
        fetchData()
    }, [dispatch])

    return (
        <div className={styles.home_wrapper}>
            {console.log('user redux', userRedux)}
            {console.log('whole schedule redux', wholeScheduleRedux)}
            {console.log('current week redux', currentWeekRedux)}
            <h1>Hello, {userRedux.name} {userRedux.surname}</h1>
            <p className={styles.home_scheduleTitle}>Розклад групи {userRedux.groupCode}</p>
            <div className={styles.home_scheduleGrid}>
                <div className={styles.home_home_schedule_firstColumn_Empty}></div>
                {[...new Array(5).fill('empty')].map((lessonNumber, index) =>{
                    return <div key={index} className={styles.home_home_schedule_firstColumn_NumberLesson}>
                        class {index+1}
                    </div>
                })}

                {
                    Object.keys(currentWeekRedux).map((dayOfWeek, index) => {
                        return (
                            <React.Fragment key={index}>
                            <div className={styles.home_scheduleColumn_Day}>{dayOfWeek}</div>
                            {
                                getNewArray(currentWeekRedux[dayOfWeek]).map((lessonObject, index) => {
                                    return <div key={index} className={styles.home_scheduleColumn_Lesson}>
                                        {
                                            lessonObject ?
                                            <Lesson
                                                lessonInfo={lessonObject}
                                                date={dayOfWeek}
                                            /> : ''
                                        }
                                    </div>
                            })
                            }
                            </React.Fragment>
                        )
                    })
                }
            </div>
            <div className={styles.exit_button}>
                <Button
                    onClick={exitHandler}
                >Exit</Button>
            </div>
        </div>
    )
}

export default Home