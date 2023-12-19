import styles from './AddDevice.module.css'
import Input from "../Input/Input";
import Button from "../Button/Button";
import {useEffect, useState} from "react";
import {AllRoomsService} from "../../services/AllRoomsService";
import {AuthServiceStudent} from "../../services/AuthServiceStudent";
import {AuthServiceTeacher} from "../../services/AuthServiceTeacher";
import {useNavigate} from "react-router-dom";
import {AddDeviceService} from "../../services/AddDeviceService";

const AddDevice = () => {
    const navigate = useNavigate()

    const [type, setType] = useState('')
    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState(0)
    const [room, setRoom] = useState(0)
    const [rooms, setRooms] = useState([])



    const inputChangeHandler = (e, field) => {
        if(field === 'type'){
            setType(e.target.value)
        } else if(field === 'name'){
            setName(e.target.value)
        } else if(field === 'model'){
            setModel(e.target.value)
        } else if(field === 'description'){
            setDescription(e.target.value)
        } else if(field === 'amount'){
            setAmount(e.target.value)
        } else if(field === 'room'){
            setRoom(e.target.value)
        }
    }

    const handleSelectChange = (e) => {
        setRoom(e.target.value)
    }

    const addDeviceHandler = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('token');
            const result = await AddDeviceService(type, name, model, description, amount, room, token)
            console.log(result.data)
            // setResponse(result.data)

            navigate('/devicesPageTeacher')
        }
        catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        const fetchGroups = async() => {
            try{
                const token = localStorage.getItem('token');
                const roomsResponse = await AllRoomsService(token)
                console.log(roomsResponse.data)
                setRooms(roomsResponse.data)
            } catch(error){
                console.error(error)
            }
        }

        fetchGroups()
    }, [])

    return <div className={styles.add_device_wrapper}>
        <h1>Новий пристрій</h1>
        <div className={styles.add_device_form}>
            <div>
                <h3>Заповнення даних</h3>
                <p className={styles.add_device_paragraph}>процес займає зазвичай не більше двох хвилин</p>
            </div>
            <Input
                placeholder={'Тип'}
                onChange={(e) => inputChangeHandler(e, 'type')}
                value={type}
                type={'text'}
            />
            <Input
                placeholder={'Назва'}
                onChange={(e) => inputChangeHandler(e, 'name')}
                value={name}
                type={'text'}
            />
            <Input
                placeholder={'Модель'}
                onChange={(e) => inputChangeHandler(e, 'model')}
                value={model}
                type={'text'}
            />
            <Input
                placeholder={'Опис'}
                onChange={(e) => inputChangeHandler(e, 'description')}
                value={description}
                type={'text'}
            />
            <Input
                placeholder={'Кількість'}
                onChange={(e) => inputChangeHandler(e, 'amount')}
                value={amount}
                type={'number'}
            />
            {/*<Input*/}
            {/*    placeholder={'Кімната'}*/}
            {/*    onChange={(e) => inputChangeHandler(e, 'room')}*/}
            {/*    value={room}*/}
            {/*    type={'password'}*/}
            {/*/>*/}
            <div className={styles.add_device_form_rooms}>
                <label>Кімната</label>
                <select value={room} onChange={handleSelectChange}>
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
            <Button
                classes={styles.add_device_button}
                onClick={addDeviceHandler}
            >
                Додати пристрій
            </Button>
        </div>
    </div>
}

export default AddDevice