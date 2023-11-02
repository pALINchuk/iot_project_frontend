import styles from './Lesson.module.css'

const Lesson = ({lessonInfo, date}) => {
    return <div
            className={`${styles.lesson_wrapper} ${lessonInfo.subject.type === 'Practice' ? styles.lessonPractice : styles.lessonLecture}`}
        >
            <p className={styles.lesson_title}>{lessonInfo.subject.name}</p>
            <p className={styles.lesson_room}>кабінет {lessonInfo.room.number}</p>
        </div>
}

export default Lesson