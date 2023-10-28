import styles from './Lesson.module.css'

const Lesson = ({lessonInfo}) => {
    return <div className={styles.lesson_wrapper}>
        <p className={styles.lesson_title}>{lessonInfo.subject.name}</p>
        <p className={styles.lesson_room}>кабінет {lessonInfo.room.number}</p>
    </div>
}

export default Lesson