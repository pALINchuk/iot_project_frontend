import axios from "axios";

export const AvailableDevices = (id, date, token) => {
    return axios.get(`https://iotmanagementapi.azurewebsites.net/api/device/available?date=${date}&scheduleId=${id}`, {
            headers: {
                accept: 'text/plain',
                Authorization: `Bearer ${token}`
            }
        }
    )
}