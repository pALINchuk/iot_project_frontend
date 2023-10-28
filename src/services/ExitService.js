import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/logout'
export const ExitService = () => {
    return axios.get(URL, {
            headers: {
                'accept': '*/*',
            }
        }
    )
}