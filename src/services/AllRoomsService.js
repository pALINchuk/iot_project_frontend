import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/room/all'

export const AllRoomsService = (token) => {
    return axios.get(URL, {
            headers: {
                accept: 'text/plain',
                Authorization: `Bearer ${token}`
            }
        }
    )
}