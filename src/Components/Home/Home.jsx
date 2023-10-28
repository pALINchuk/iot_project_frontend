import React from "react";
import styles from './Home.module.css'
import Button from "../Button/Button";
import {UserInformationService} from "../../services/UserInformationService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ScheduleService} from "../../services/ScheduleService";
import Lesson from "../Lesson/Lesson";

const Home = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [schedule, setSchedule] = useState({})
    const [currentWeek, setCurrentWeek] = useState({})

    const exitHandler = async(e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try{
            // const result = await ExitService()
            // console.log(result.data)

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
            console.log(result.data)
            setUser(result.data)

            const schedule = await ScheduleService(token)
            console.log(schedule.data) //schedule.data.schedule[schedule.data.currentWeek]
            setSchedule(schedule.data)
            console.log(schedule.data.schedule[schedule.data.currentWeek])
            setCurrentWeek(schedule.data.schedule[schedule.data.currentWeek])
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
    }, [])

    return (
        <div className={styles.home_wrapper}>
            <h1>Hello, {user.name} {user.surname}</h1>
            <p className={styles.home_scheduleTitle}>Розклад групи {user.groupCode}</p>
            <div className={styles.home_scheduleGrid}>
                {/*<div className={styles.home_scheduleHeader}>*/}
                {/*    <div className={styles.home_scheduleHeader_Emptycell}>empty</div>*/}
                {/*    /!*{console.log('current week', currentWeek)}*!/*/}
                {/*    {*/}
                {/*        Object.keys(currentWeek).map((dayOfWeek, index) => {*/}
                {/*            return <div*/}
                {/*                    className={styles.home_scheduleHeader_Day}*/}
                {/*                    key={index}*/}
                {/*                >*/}
                {/*                /!*{console.log(currentWeek[dayOfWeek])}*!/*/}
                {/*                {dayOfWeek}*/}
                {/*            </div>*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}

                {/*{*/}
                {/*    Object.keys(currentWeek).map((dayOfWeek, index) => {*/}
                {/*        return <div*/}
                {/*            className={styles.home_scheduleRow}*/}
                {/*            key={index}*/}
                {/*        >*/}
                {/*            <div className={styles.home_scheduleRow_NumberOfLesson}>lesson {index+1}</div>*/}
                {/*            {console.log([...currentWeek[dayOfWeek], ...(new Array(6 - (currentWeek[dayOfWeek].length > 6 ? 6 : currentWeek[dayOfWeek].length)).fill(null))])}*/}
                {/*            {*/}
                {/*                [...currentWeek[dayOfWeek], ...(new Array(6 - (currentWeek[dayOfWeek].length > 6 ? 6 : currentWeek[dayOfWeek].length)).fill(null))].map((lessonObject, index) => {*/}
                {/*                    return <div key={index} className={styles.home_scheduleRow_Lesson}>*/}
                {/*                        {lessonObject ? lessonObject.id : 'empty'}*/}
                {/*                    </div>*/}
                {/*                })*/}
                {/*            }*/}

                {/*            /!*{currentWeek[dayOfWeek].map((lessonObject, index) => {*!/*/}
                {/*            /!*    return <div key={index} className={styles.home_scheduleRow_Lesson}>*!/*/}
                {/*            /!*        {lessonObject.id}*!/*/}
                {/*            /!*    </div>*!/*/}
                {/*            /!*})}*!/*/}
                {/*        </div>*/}
                {/*    })*/}
                {/*}*/}

                {/*<div className={styles.home_home_schedule_firstColumn}>*/}
                    <div className={styles.home_home_schedule_firstColumn_Empty}></div>
                    {[...new Array(5).fill('empty')].map((lessonNumber, index) =>{
                        return <div key={index} className={styles.home_home_schedule_firstColumn_NumberLesson}>
                            class {index+1}
                        </div>
                    })}
                {/*</div>*/}

                {
                    Object.keys(currentWeek).map((dayOfWeek, index) => {
                        return (
                            // <div
                            //     className={styles.home_scheduleColumn}
                            //     key={index}
                            // >
                            <React.Fragment key={index}>
                            <div className={styles.home_scheduleColumn_Day}>{dayOfWeek}</div>
                            {
                                getNewArray(currentWeek[dayOfWeek]).map((lessonObject, index) => {
                                    // return <div key={index} className={`${styles.home_scheduleColumn_Lesson} ${lessonObject ? styles.home_scheduleColumn_Lesson_Active : ''}`}>
                                    //     {lessonObject ? `${lessonObject.subject.name}, room - ${lessonObject.room.number}` : ''}
                                    // </div>
                                    return <div key={index} className={styles.home_scheduleColumn_Lesson}>
                                        {
                                            lessonObject ?
                                            <Lesson
                                                lessonInfo={lessonObject}
                                            /> : ''
                                        }
                                    </div>
                            })
                            }
                            </React.Fragment>
                        // </div>
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