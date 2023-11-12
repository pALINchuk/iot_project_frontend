import axios from "axios";

export const ApproveBookingService = (bookingId, token) => {
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