import axios from 'axios';
import { JWT_KEY } from '../common/AuthConstants';


class API {
    static BASE_URL: string = 'http://localhost:8080';

    static noAuth() {
        return axios.create({
            baseURL: API.BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static auth() {
        return axios.create({
            baseURL: API.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem(JWT_KEY)}`
            }
        });
    }
}

export default API;