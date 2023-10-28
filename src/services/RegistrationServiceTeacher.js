import axios from "axios";

const URL = 'https://iotmanagementapi.azurewebsites.net/api/auth/signup/teacher'
export const RegistrationServiceTeacher = (name, surname, email, password) => {
    return axios.post(URL, {
            user: {
                name: name,
                surname: surname,
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