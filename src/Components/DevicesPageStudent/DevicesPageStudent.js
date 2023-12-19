import styles from './DevicesPageStudent.module.css'
import Button from "../Button/Button";

const DevicesPageStudent = () => {
    const handleBookDevice = () => {

    }



    return <div className={styles.devices_student_wrapper}>
        {/*devices page student*/}
        <h3>Заброньвані елементи</h3>
        <div>

            <Button
                classes={styles.bookDeviceButton}
                onClick={handleBookDevice}
            >Забронювати новий пристрій</Button>
        </div>
    </div>
}

export default DevicesPageStudent