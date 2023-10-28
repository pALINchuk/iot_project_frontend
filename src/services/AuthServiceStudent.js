import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/signin/student'
export const AuthServiceStudent = (email, password) => {
    return axios.post(URL, {
            user: {
                email: email,
                password: password
            }
        },
        {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        },
        {
            // withCredentials: true
        }
    )
}