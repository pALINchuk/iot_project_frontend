import styles from './DevicesPageTeacher.module.css'
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AllRoomsService} from "../../services/AllRoomsService";
import {RoomDevicesService} from "../../services/RoomDevicesService";

const DevicesPageTeacher = () => {
    const navigate = useNavigate()

    const [rooms, setRooms] = useState([])
    const [chosenRoom, setChosenRoom] = useState(0)
    const [listOfDevices, setListOfDevices] = useState([])

    const handleAddDevice = (e) => {
        e.preventDefault();
        navigate('/addDevice')
    }

    const handleSelectChange = (e) => {
        setChosenRoom(e.target.value)
    }

    useEffect(() => {
        const fetch = async() => {
            try{
                const token = localStorage.getItem('token');
                const roomsResponse = await AllRoomsService(token)
                const listOfDevices = await RoomDevicesService(chosenRoom, token)
                console.log(roomsResponse.data)
                setRooms(roomsResponse.data)
                setListOfDevices(listOfDevices.data)
            } catch(error){
                console.error(error)
            }
        }

        fetch()
    }, [chosenRoom])

    return <div className={styles.devices_teacher_wrapper}>
        <h1>Додані пристрої</h1>
        <div className={styles.devices_whole_block}>
            <div className={styles.devices_list_block}>
                <div className={styles.devices_choose_room}>
                    <label>Кімната</label>
                    <select value={chosenRoom} onChange={handleSelectChange}>
                        <option value="">Обрати</option>
                        {
                            rooms.map((option, index) => (
                                <option key={index} value={option.number}>
                                    {option.number}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className={styles.devices_list}>
                    {
                        listOfDevices.map((device, index) => {
                            return <div className={styles.devices_list_device} key={index}>
                                <div>
                                    <p className={styles.devices_list_device_model}>
                                        {device.deviceInfo.model}
                                    </p>
                                    <p className={styles.devices_list_device_name}>{device.deviceInfo.name}</p>
                                    <p className={styles.devices_list_device_amount}>Кількість: {device.amount}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <Button
                classes={styles.addDeviceButton}
                onClick={handleAddDevice}
            >Додати новий пристрій</Button>
        </div>
    </div>
}

export default DevicesPageTeacher