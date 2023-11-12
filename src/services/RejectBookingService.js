import axios from "axios";

export const RejectBookingService = (bookingId, token) => {
    return axios.post(`https://iotmanagementapi.azurewebsites.net/api/booking/approve/${bookingId}`,
        {},
        {
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
    )
}