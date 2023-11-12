import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/booking/requests'

export const BookingRequestsService = (token) => {
    return axios.get(URL, {
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
    )
}