import Axios from "axios";


const baseUrl = 'http://192.168.0.19:9090/api/auth'

export const getAuth = (email, password) => {
    return Axios.post(baseUrl + '/signin', { email: email, password: password });
}

