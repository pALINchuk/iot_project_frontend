import styles from './Lesson.module.css'
import {useNavigate} from "react-router-dom";

const Lesson = ({lessonInfo, date}) => {
    const navigate = useNavigate()

    const handleLessonOnclick = () => {
        navigate(`/class/${lessonInfo.id}/${date}`)
    }

    return <div
            className={`${styles.lesson_wrapper} 
                        ${lessonInfo.subject.type === 'Practice' ? styles.lessonPractice : styles.lessonLecture}`}
            onClick={handleLessonOnclick}
        >
            <p className={styles.lesson_title}>{lessonInfo.subject.name}</p>
            <p className={styles.lesson_room}>кабінет {lessonInfo.room.number}</p>
        </div>
}

export default Lesson