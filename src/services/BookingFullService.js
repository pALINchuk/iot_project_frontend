import axios from "axios";

export const BookingFullService = (id, date, token) => {
    return axios.get(`https://iotmanagementapi.azurewebsites.net/api/booking/full?date=${date}&scheduleId=${id}`, {
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
    )
}