import React from "react";
import styles from './Home.module.css'
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import Lesson from "../Lesson/Lesson";
import {useSelector} from "react-redux";

const Home = () => {
    const navigate = useNavigate()

    const userRedux = useSelector(state => state.user)
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

    return (
        <div className={styles.home_wrapper}>
            <h1>Вітаємо, {userRedux.name} {userRedux.surname}</h1>
            {/*<p className={styles.home_scheduleTitle}>Розклад групи {userRedux.groupCode}</p>*/}
            <p className={styles.home_scheduleTitle}>Особистий розклад</p>
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