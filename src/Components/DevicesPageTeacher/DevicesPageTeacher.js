import styles from './DevicesPageTeacher.module.css'
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

const DevicesPageTeacher = () => {
    const navigate = useNavigate()

    const handleAddDevice = (e) => {
        e.preventDefault();
        navigate('/addDevice')
    }

    return <div className={styles.devices_teacher_wrapper}>
        devices page teacher
        <div>

            <Button
                classes={styles.addDeviceButton}
                onClick={handleAddDevice}
            >Додати новий пристрій</Button>
        </div>
    </div>
}

export default DevicesPageTeacher