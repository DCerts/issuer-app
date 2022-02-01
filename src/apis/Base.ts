import dotenv from 'dotenv';
import axios from 'axios';
import { JWT_KEY } from '../common/AuthConstants';


dotenv.config();

const BASE_API_URL = process.env.BASE_API_URL || 'http://localhost:8080';

class API {
    static BASE_URL: string = BASE_API_URL;

    static noAuth() {
        return axios.create({
            baseURL: API.BASE_URL,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    static auth() {
        const token = localStorage.getItem(JWT_KEY);
        if (!token) throw new Error();
        return axios.create({
            baseURL: API.BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }
}

export default API;