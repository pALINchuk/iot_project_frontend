import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/group'

export const GetGroupsService = () => {
    return axios.get(URL, {
            headers: {
                accept: 'text/plain'
            }
        }
    )
}