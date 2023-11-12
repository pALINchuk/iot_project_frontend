import styles from './ClassDetails.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AvailableDevices} from "../../services/AvailableDevicesService";
import {useEffect, useState} from "react";
import {BookingFullService} from "../../services/BookingFullService";
import {BookingRequestsService} from "../../services/BookingRequestsService";
import {BookingDeviceService} from "../../services/BookingDeviceService";

const ClassDetails = () => {
    const {id, date} = useParams()
    const navigate = useNavigate()
    const userRedux = useSelector(state => state.user)
    const isStudent = Boolean(userRedux.groupCode)
    const wholeScheduleRedux = useSelector(state => state.wholeSchedule)
    const currentWeekRedux = useSelector(state => state.currentWeek)

    const [availableDevices, setAvailableDevices] = useState([])

    const [classInformation, setClassInformation] = useState({})

    const [bookingsList, setBookingsList] = useState([])

    const handleRequestButtonTeacher = async () => {

    }

    const handleDeviceBooking = async(deviceId) => {
        console.log(typeof deviceId, deviceId)
        try {
            const token = localStorage.getItem('token');
            await BookingDeviceService(deviceId, id, date, token)
            console.log('booked')
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                console.log('Unauthorized access. Redirecting to login page...');
                localStorage.removeItem('token');
                navigate('/login')
                // Redirect to the login page or perform other actions for unauthorized access
            } else if(error.response && error.response.status === 404){
                console.log('error')
            }
            else {
                // Handle other types of errors (network error, server error, etc.)
                console.error('Error occurred:', error);
            }
        }
    }

    const getClassInformation = (schedule, id, date) => {
        if (schedule[date]) {
            const classes = schedule[date];
            const classInfo = classes.find(classObj => classObj.id === +id);
            if (classInfo) {
                setClassInformation(classInfo)
            } else {
                console.log("Class not found for the given ID on the specified date.");
            }
        } else {
            console.log("No classes scheduled for the specified date.");
        }
    }

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = isStudent ? await BookingFullService(id, date, token) : await BookingRequestsService(token)
            setBookingsList(result.data)
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error
                console.log('Unauthorized access. Redirecting to login page...');
                localStorage.removeItem('token');
                navigate('/login')
                // Redirect to the login page or perform other actions for unauthorized access
            } else if(error.response && error.response.status === 404){
                console.log('no bookings')
            }
            else {
                // Handle other types of errors (network error, server error, etc.)
                console.error('Error occurred:', error);
            }
        }
    }

    const fetchAvailableDevices = async () => {
        try {
            const token = localStorage.getItem('token');
            const result = await AvailableDevices(id, date, token)
            console.log('devices', result.data)
            setAvailableDevices(result.data)
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
        fetchAvailableDevices()
        fetchBookings()
        getClassInformation(currentWeekRedux, id, date)
    }, [currentWeekRedux])

    return <div className={styles.classesDetails_wrapper}>
        {console.log(classInformation)}
        <div className={styles.classesDetails_title}>
            <h1>Вітаємо, {userRedux.name} {userRedux.surname}</h1>
        </div>

        <div className={styles.classesDetails_mainBlock}>
            <div>
                <h3>Інформація про пару</h3>
                <div className={styles.classesDetails_class_informationBlock}>
                    <div className={styles.classesDetails_informationBlock_class_name}>
                        <p className={styles.classesDetails_informationBlock_typeOfClass}>
                            {classInformation ? classInformation.subject?.type : ''}
                        </p>
                        <p className={styles.classesDetails_informationBlock_nameOfClass}>
                            {classInformation ? classInformation.subject?.name : ''}
                        </p>
                    </div>
                    <div className={styles.classesDetails_informationBlock_details}>
                        <p>{isStudent ?
                                (classInformation ? classInformation.subject?.teacherFullName : '')
                            : (classInformation ? classInformation.groupCodes?.join(', ') : '')
                            }
                        </p>
                        <p>{date}</p>
                        <p>{classInformation ? classInformation.room?.number : ''}</p>
                    </div>
                </div>

                <h3>{isStudent ? 'Заброньовано мною' : 'Запити на бронювання'}</h3>
                <div className={styles.classesDetails_class_bookedBlock}>
                    {
                        bookingsList.map((booking, index) => {
                            return <div className={styles.classesDetails_available_device} key={index}>
                                {console.log('fjdklsaf', booking)}
                                <div>
                                    <p className={styles.classesDetails_device_model}>{booking.device.deviceInfo.model}</p>
                                    <p className={styles.classesDetails_device_name}>{booking.device.deviceInfo.name}</p>
                                    <p className={styles.classesDetails_device_name}>status - {booking.status}</p>
                                </div>
                                <div className={styles.classesDetails_requestsTeacherButtons}>
                                    {
                                        isStudent ? '' : <div
                                            className={styles.classesDetails_rejectRequestButton}
                                            onClick={handleRequestButtonTeacher}
                                        >
                                            -
                                        </div>
                                    }
                                    {
                                        isStudent ? '' : <div
                                                className={styles.classesDetails_approveRequestButton}
                                                onClick={handleRequestButtonTeacher}
                                            >
                                                +
                                            </div>
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>

            <div>
                <h3>Доступні для броні</h3>
                <div className={styles.classesDetails_available_devices_block}>
                    {
                        availableDevices.map((device, index) => {
                            return <div className={styles.classesDetails_available_device} key={index}>
                                <div>
                                    <p className={styles.classesDetails_device_model}>
                                        {device.deviceInfo.model}
                                    </p>
                                    <p className={styles.classesDetails_device_name}>{device.deviceInfo.name}</p>
                                    <p className={styles.classesDetails_device_name}>amount {device.amount}</p>
                                </div>
                                {
                                    isStudent ? <div
                                        className={styles.classesDetails_available_device_book}
                                        onClick={()=>handleDeviceBooking(device.id)}
                                        >
                                            +
                                        </div>
                                        : ''
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}

export default ClassDetails