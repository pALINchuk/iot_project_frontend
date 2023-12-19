import axios from "axios";

export const AddDeviceService = (type, name, model, description, amount, room, token) => {
    return axios.post('https://iotmanagementapi.azurewebsites.net/api/device',
        {
            type: type,
            name: name,
            model: model,
            description: description,
            amount: amount,
            roomNumber: room
        },
        {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    )
}