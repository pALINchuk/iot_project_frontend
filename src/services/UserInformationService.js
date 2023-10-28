import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/profile'
export const UserInformationService = (token) => {
    return axios.get(URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
}