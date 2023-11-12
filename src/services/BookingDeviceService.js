import axios from "axios";

export const BookingDeviceService = (deviceId, lessonId, date, token) => {
    return axios.post(`https://iotmanagementapi.azurewebsites.net/api/booking/device/${deviceId}?date=${date}&scheduleId=${lessonId}`,
        {},
        {
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
    )
}