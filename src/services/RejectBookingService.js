import axios from "axios";

export const RejectBookingService = (bookingId, token) => {
    return axios.post(`https://iotmanagementapi.azurewebsites.net/api/booking/reject/${bookingId}`,
        {},
        {
            headers: {
                accept: '*/*',
                Authorization: `Bearer ${token}`
            }
        }
    )
}