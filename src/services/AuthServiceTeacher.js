import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/signin/teacher'
export const AuthServiceTeacher = (email, password) => {
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
        }
    )
}