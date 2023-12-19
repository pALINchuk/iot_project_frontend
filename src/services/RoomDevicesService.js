import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/device'

export const RoomDevicesService = (room, token) => {
    return axios.get(`${URL}?room=${room}`, {
            headers: {
                accept: 'text/plain',
                Authorization: `Bearer ${token}`
            }
        }
    )
}