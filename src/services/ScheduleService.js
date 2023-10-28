import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/schedule/full'
export const ScheduleService = (token) => {
    return axios.get(URL, {
            headers: {
                accept: 'text/plain',
                Authorization: `Bearer ${token}`
            }
        }
    )
}