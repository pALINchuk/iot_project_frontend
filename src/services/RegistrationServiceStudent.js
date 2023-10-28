import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/signup/student'
export const RegistrationServiceStudent = (name, surname, email, password, group) => {
    return axios.post(URL, {
            user: {
                name: name,
                surname: surname,
                email: email,
                password: password
            },
            groupCode: group
        },
        {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        }
    )
}