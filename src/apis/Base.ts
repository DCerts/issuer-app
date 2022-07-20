import axios from 'axios';
import { JWT_KEY } from '../common/constants/AuthConstants';

class API {
    static baseUrl() {
        return process.env.REACT_APP_BASE_API_URL;
    };

    static noAuth() {
        return axios.create({
            baseURL: API.baseUrl(),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static auth() {
        const token = localStorage.getItem(JWT_KEY);
        if (!token) throw new Error();
        return axios.create({
            baseURL: API.baseUrl(),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    static clearToken() {
        localStorage.removeItem(JWT_KEY);
    }
}

export default API;